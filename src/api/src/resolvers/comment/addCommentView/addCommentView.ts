import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { ResponseError } from '../../../shared/mongo/ResponseError'
import { firstError } from '../../../helpers/firstError'
import { AddCommentViewInputs } from '../../../shared/comment/AddCommentView'
import { CommentModel } from '../../../shared/comment/Comment'
import { UpdateRes } from '../../../shared/mongo/UpdateRes'

export const addCommentView = async (ctx: Context, next: Next): Promise<void> => {
  const addCommentViewArgs = plainToClass(AddCommentViewInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(addCommentViewArgs, { forbidUnknownValues: true }).catch(firstError)
  const { commentId } = addCommentViewArgs

  const incrementViewCount: UpdateRes = await CommentModel.updateOne(
    { _id: commentId },
    { $inc: { viewCount: 1 } },
  ).exec()

  const viewCountIsIncremented = incrementViewCount && incrementViewCount.nModified && incrementViewCount.nModified >= 1
  if (!viewCountIsIncremented) throw new ResponseError(400, 'Comment not found')

  ctx.status = 200
  ctx.body = {}

  await next()
}
