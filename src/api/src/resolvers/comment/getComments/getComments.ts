import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'
import { ObjectId } from 'mongodb'

import { firstError } from '../../../helpers/firstError'
import { Comment, CommentModel } from '../../../shared/comment/Comment'
import { CommentUserVote } from '../../../shared/comment/CommentUserVote'
import { GetCommentsInputs, GetCommentsOutputs } from '../../../shared/comment/GetComments'
import { PublicUser } from '../../../shared/user/PublicUser'
import { User, UserModel } from '../../../shared/user/User'
import { Vote, VoteModel } from '../../../shared/vote/Vote'
import { PUBLIC_USER_MONGO_SELECTOR } from '../../page/getPublicUser/getPublicUser'
import { optionalAuthenticate } from '../../user/helpers/optionalAuthenticate'

export const getComments = async (ctx: Context, next: Next): Promise<void> => {
  const getCommentsArgs = plainToClass(GetCommentsInputs, ctx.request.body, {
    excludeExtraneousValues: true,
  })
  await validateOrReject(getCommentsArgs, { forbidUnknownValues: true }).catch(firstError)
  const { search, subjectCategory, page = 0, targetId, targetType, commentType } = getCommentsArgs

  const authUser: User | undefined = await optionalAuthenticate(ctx)

  let selector = {}
  if (targetId) selector = Object.assign(selector, { targetId })
  if (targetType) selector = Object.assign(selector, { targetType })
  if (commentType) selector = Object.assign(selector, { commentType })
  if(subjectCategory) selector = Object.assign(selector, { subjectCategory })
  if(search && search !== '') selector = Object.assign(selector, { title: new RegExp(search, 'i') })

  let comments: Comment[] = await CommentModel.find(selector, null, {
    limit: 20,
    skip: page * 20,
    sort: { createdAt: -1 },
  }).lean()
  if (!comments || comments.length === 0) comments = []

  const commentIds = comments.map((comment) => comment._id) as ObjectId[]
  let replyIds = comments
    .filter((comment) => comment.replyIds)
    .map((comment) => comment.replyIds)
    .flat(Infinity) as ObjectId[]
  replyIds = replyIds.filter((el) => !commentIds.includes(el))
  const replies: Comment[] = await CommentModel.find({ _id: { $in: replyIds } })
    .sort({ createdAt: -1 })
    .lean()
  if (replies && replies.length > 0) comments.push(...replies)

  const userIds = comments.map((comment) => comment.userId)
  let users: PublicUser[] = await UserModel.find({ _id: { $in: userIds } }, PUBLIC_USER_MONGO_SELECTOR).lean()
  if (!users || users.length === 0) users = []

  let votes: Vote[] = []
  if (authUser) {
    const commentIds = comments.map((comment) => comment._id)
    votes = await VoteModel.find({ userId: authUser._id, commentId: { $in: commentIds } }).lean()
    if (!votes || votes.length === 0) votes = []
  }

  const commentUserVotes: CommentUserVote[] = comments.map((comment) => {
    const user = users.filter(user => user._id.toHexString() === comment.userId.toHexString()).shift()
    const vote = votes.filter(vote => vote.commentId.toHexString() === comment._id.toHexString()).shift()

    return {
      comment,
      user,
      vote
    }
  })

  const response: GetCommentsOutputs = { commentUserVotes }

  ctx.status = 200
  ctx.body = response

  await next()
}
