import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { ChargeInputs, ChargeOutputs } from '../../../shared/key/Charge'
import { Key, KeyModel } from '../../../shared/key/Key'
import { KeyUser } from '../../../shared/key/KeyUser'
import { PublicUser } from '../../../shared/user/PublicUser'
import { UserModel } from '../../../shared/user/User'
import { PUBLIC_USER_MONGO_SELECTOR } from '../../page/getPublicUser/getPublicUser'

export const Charge = async (ctx: Context, next: Next): Promise<void> => {
  const ChargeArgs = plainToClass(ChargeInputs, ctx.request.body, {
    excludeExtraneousValues: true,
  })
  await validateOrReject(ChargeArgs, { forbidUnknownValues: true }).catch(firstError)
  const { videoId } = ChargeArgs

  const keys: Key[] = await KeyModel.find({ videoId, buyerId: { $exists: false } }).sort({ price: 1 }).lean()

  const userIds = keys.map((key) => key.sellerId)
  let users: PublicUser[] = await UserModel.find({ _id: { $in: userIds } }, PUBLIC_USER_MONGO_SELECTOR).lean()
  
  const keyUsers: KeyUser[] = keys.map((key) => {
    const user = users.filter(user => user._id.toHexString() === key.sellerId.toHexString()).shift()

    return {
      key,
      user,
    }
  })
  
  const reponse: ChargeOutputs = { keyUsers }

  ctx.status = 200
  ctx.body = reponse

  await next()
}
