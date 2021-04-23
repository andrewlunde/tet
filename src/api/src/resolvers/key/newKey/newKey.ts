import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { Key, KeyModel } from '../../../shared/key/Key'
import { NewKeyInputs, NewKeyOutputs } from '../../../shared/key/NewKey'
import { User } from '../../../shared/user/User'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../../user/helpers/authenticate'
import { VideoModel } from '../../../shared/video/Video'
import { ResponseError } from '../../../shared/mongo/ResponseError'

export const newKey = async (ctx: Context, next: Next): Promise<void> => {
  const newKeyArgs = plainToClass(NewKeyInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(newKeyArgs, { forbidUnknownValues: true }).catch(firstError)
  const { videoId, price, key } = newKeyArgs

  const authUser: User = await authenticate(ctx)

  await rateLimit(authUser._id)

  const video = await VideoModel.findOne({ _id: videoId })
  if (!video) throw new ResponseError(404, 'Seller not found')

  const newKey: Key = await KeyModel.create({ sellerId: authUser._id, videoId, price, key } as Key)

  const reponse: NewKeyOutputs = { key: newKey }

  ctx.status = 200
  ctx.body = reponse

  await next()
}
