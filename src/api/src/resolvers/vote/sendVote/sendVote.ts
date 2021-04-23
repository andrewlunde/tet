import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { Comment, CommentModel } from '../../../shared/comment/Comment'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { UpdateRes } from '../../../shared/mongo/UpdateRes'
import { NotificationModel } from '../../../shared/notification/Notification'
import { NotificationType } from '../../../shared/notification/NotificationType'
import { User, UserModel } from '../../../shared/user/User'
import { Vote, VoteModel } from '../../../shared/vote/Vote'
import { VoteDirection } from '../../../shared/vote/VoteDirection'
import { authenticate } from '../../user/helpers/authenticate'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { SendVoteInputs } from '../../../shared/vote/SendVote'

export const sendVote = async (ctx: Context, next: Next): Promise<void> => {
  const sendVoteArgs = plainToClass(SendVoteInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(sendVoteArgs, { forbidUnknownValues: true }).catch(firstError)
  const { commentId, voteDirection } = sendVoteArgs

  const user: User = await authenticate(ctx)

  await rateLimit(user._id)

  // Check if comment exists
  const comment: Comment = (await CommentModel.findOne({ _id: commentId }).lean()) as Comment
  if (!comment) throw new ResponseError(404, 'Comment not found')

  // Check if vote already exists
  const vote: Vote | null = await VoteModel.findOne({
    commentId: comment._id,
    userId: user._id,
    voteDirection,
  }).lean()
  if (vote) throw new ResponseError(400, 'Already voted')

  // Check if vote exists and update it or create it
  const updateOrCreateVote: UpdateRes = await VoteModel.updateOne(
    { commentId: comment._id, userId: user._id },
    {
      $set: { voteDirection },
    },
    { upsert: true, setDefaultsOnInsert: true },
  ).exec()

  // Update comment vote counts
  const isModified = updateOrCreateVote && updateOrCreateVote.nModified >= 1
  const isInserted = updateOrCreateVote && updateOrCreateVote.upserted && updateOrCreateVote.upserted.length >= 1

  let modifier = {}
  if (isInserted && voteDirection === VoteDirection.DOWN) modifier = { downCount: 1 }
  else if (isInserted && voteDirection === VoteDirection.UP) modifier = { upCount: 1 }
  else if (isModified && voteDirection === VoteDirection.DOWN) modifier = { downCount: 1, upCount: -1 }
  else modifier = { upCount: 1, downCount: -1 } // isModified && voteDirection === VoteDirection.UP

  await CommentModel.updateOne(
    { _id: commentId },
    {
      $inc: modifier,
    },
  ).exec()

  // Create notification
  const author: User | null = await UserModel.findOne({ _id: comment.userId }).lean()

  if (author) {
    const notificationType =
      voteDirection === VoteDirection.DOWN ? NotificationType.COMMENT_DOWNVOTED : NotificationType.COMMENT_UPVOTED
    await NotificationModel.updateOne(
      { userId: author._id, targetId: comment._id, notificationType },
      {
        $inc: { count: 1 },
      },
      { upsert: true, setDefaultsOnInsert: true },
    ).exec()
  }

  ctx.status = 200
  ctx.body = {}

  await next()
}
