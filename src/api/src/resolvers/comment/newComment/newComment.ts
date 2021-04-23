import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'
import * as getSlug from 'speakingurl'

import { firstError } from '../../../helpers/firstError'
import { toPublicUser } from '../../../helpers/toPublicUser'
import { Comment, CommentModel } from '../../../shared/comment/Comment'
import { ModerationStatus } from '../../../shared/comment/ModerationStatus'
import { NewCommentInputs, NewCommentOutputs } from '../../../shared/comment/NewComment'
import { TargetType } from '../../../shared/comment/TargetType'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { StatModel } from '../../../shared/stat/Stat'
import { StatType } from '../../../shared/stat/StatType'
import { PublicUser } from '../../../shared/user/PublicUser'
import { User } from '../../../shared/user/User'
import { Vote, VoteModel } from '../../../shared/vote/Vote'
import { VoteDirection } from '../../../shared/vote/VoteDirection'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../../user/helpers/authenticate'

export const newComment = async (ctx: Context, next: Next): Promise<void> => {
  const newCommentArgs = plainToClass(NewCommentInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(newCommentArgs, { forbidUnknownValues: true }).catch(firstError)
  const {
    title,
    content,
    commentType,
    targetType,
    targetId,
    subjectCategory,
    contentImage,
    titleImage,
  } = newCommentArgs

  if (!content && !contentImage) throw new ResponseError(400, 'Your comment is empty')
  if (commentType === TargetType.POST && !title) throw new ResponseError(400, 'Post needs a title')

  const authUser: User = await authenticate(ctx)

  await rateLimit(authUser._id)

  // Create comment
  const comment: Comment = await CommentModel.create({
    userId: authUser._id,
    title,
    slug: title ? getSlug(title) : undefined,
    content,
    commentType: commentType || TargetType.COMMENT,
    targetType,
    targetId,
    subjectCategory,
    contentImage,
    titleImage,
    moderationStatus: ModerationStatus.PENDING,
    upCount: 1,
  })

  // If is reply, add id to parent replies
  let depth = 0
  let parentId = targetId
  let parentType = targetType
  while (depth < 10 && parentId && parentType === TargetType.COMMENT) {
    depth++
    const repliedComment: Comment | null = await CommentModel.findOneAndUpdate(
      { _id: parentId },
      {
        $addToSet: { replyIds: comment._id },
      },
      { upsert: false, setDefaultsOnInsert: true },
    ).exec()
    parentId = repliedComment ? repliedComment.targetId : undefined
    parentType = repliedComment ? repliedComment.targetType : undefined
  }

  // Create default vote
  const vote: Vote = await VoteModel.create({
    userId: authUser._id,
    commentId: comment._id,
    voteDirection: VoteDirection.UP,
  } as Vote)

  // If targetType is POST, increment replyCount
  if(targetType === TargetType.POST) {
    await CommentModel.findOneAndUpdate(
      { _id: targetId },
      {
        $inc: { replyCount: 1 },
      },
      { upsert: false },
    ).exec()
  }

  // Increment COMMENTS stat
  await StatModel.findOneAndUpdate(
    { statType: StatType.COMMENTS },
    {
      $inc: { count: 1 },
    },
    { upsert: true, setDefaultsOnInsert: true },
  ).exec()

  // Increment SUBJECT_CATEGORY stat
  if (subjectCategory)
    await StatModel.findOneAndUpdate(
      { statType: StatType.SUBJECT_CATEGORY, subjectCategory },
      {
        $inc: { count: 1 },
      },
      { upsert: true, setDefaultsOnInsert: true },
    ).exec()

  const user: PublicUser = toPublicUser(authUser)

  const commentUserVote = {
    comment,
    user,
    vote,
  }

  const reponse: NewCommentOutputs = { commentUserVote }

  ctx.status = 200
  ctx.body = reponse

  await next()
}
