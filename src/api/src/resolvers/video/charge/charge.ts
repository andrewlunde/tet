import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { User, UserModel } from '../../../shared/user/User'
import { ChargeInputs } from '../../../shared/video/Charge'
import { Video, VideoModel } from '../../../shared/video/Video'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../../user/helpers/authenticate'

export const charge = async (ctx: Context, next: Next): Promise<void> => {
  const chargeArgs = plainToClass(ChargeInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(chargeArgs, { forbidUnknownValues: true }).catch(firstError)
  let { videoId } = chargeArgs

  const user: User = await authenticate(ctx)

  await rateLimit(user._id)

  await UserModel.findOneAndUpdate(
    { _id: user._id },
    { $inc: { balance: -1 } },
    { new: true },
  ).exec()

  if (videoId) {
    const video: Video = (await VideoModel.findOne({ _id: videoId }).lean()) as Video
    if (video.author) {
      await UserModel.findOneAndUpdate({ _id: video.author }, { $inc: { balance: 1 } }, { new: true }).exec()
    }
  }

  // TODO: Transfer FUEL on Theta
  // const account = await provider.getAccount(wallet.address);
  // FAILS BECAUSE OF ERROR IN ERROR IN @thetalabs/theta-js : "Fetch is not defined"

  ctx.status = 200
  ctx.body = {}

  await next()
}
