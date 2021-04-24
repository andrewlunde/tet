import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { ChargeInputs } from '../../../shared/video/Charge'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../../user/helpers/authenticate'
import { User, UserModel } from '../../../shared/user/User'

export const charge = async (ctx: Context, next: Next): Promise<void> => {
  const chargeArgs = plainToClass(ChargeInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(chargeArgs, { forbidUnknownValues: true }).catch(firstError)
  let { videoId } = chargeArgs

  const user: User = await authenticate(ctx)

  await rateLimit(user._id)

  const updatedUser: User = (await UserModel.findOneAndUpdate(
    { _id: user._id },
    { $inc: { balance: -1 } },
    { new: true },
  ).exec()) as User

  console.log(videoId, updatedUser)

  // TODO: Transfer money to author

  ctx.status = 200
  ctx.body = { }

  await next()
}
