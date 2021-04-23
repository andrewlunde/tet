import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { Comment, CommentModel } from '../../../shared/comment/Comment'
import { GetCommentInputs, GetCommentOutputs } from '../../../shared/comment/GetComment'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { PublicUser } from '../../../shared/user/PublicUser'
import { UserModel, User } from '../../../shared/user/User'
import { PUBLIC_USER_MONGO_SELECTOR } from '../../page/getPublicUser/getPublicUser'
import { VoteModel, Vote } from '../../../shared/vote/Vote'
import { optionalAuthenticate } from '../../user/helpers/optionalAuthenticate'
import { CommentUserVote } from '../../../shared/comment/CommentUserVote'

export const getComment = async (ctx: Context, next: Next): Promise<void> => {
  const getCommentArgs = plainToClass(GetCommentInputs, ctx.request.body, {
    excludeExtraneousValues: true,
  })
  await validateOrReject(getCommentArgs, { forbidUnknownValues: true }).catch(firstError)
  const { commentId } = getCommentArgs

  const authUser: User | undefined = await optionalAuthenticate(ctx)

  const comment = (await CommentModel.findOne({ _id: commentId }).lean()) as Comment
  if (!comment) throw new ResponseError(404, 'Comment not found')

  const user: PublicUser | undefined = await UserModel.findOne({ _id: comment.userId }, PUBLIC_USER_MONGO_SELECTOR).lean() as PublicUser | undefined 

  let vote: Vote | undefined;
  if (authUser) {
    vote = await VoteModel.findOne({ commentId, userId: authUser._id }).lean() as Vote | undefined
  }

  const commentUserVote: CommentUserVote = {
    comment,
    user,
    vote
  }
  
  const reponse: GetCommentOutputs = { commentUserVote }

  ctx.status = 200
  ctx.body = reponse

  await next()
}
