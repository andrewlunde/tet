import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { BuyKeyInputs, BuyKeyOutputs } from '../../../shared/key/BuyKey'
import { Key, KeyModel } from '../../../shared/key/Key'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { User, UserModel } from '../../../shared/user/User'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../../user/helpers/authenticate'

export const buyKey = async (ctx: Context, next: Next): Promise<void> => {
  const buyKeyArgs = plainToClass(BuyKeyInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(buyKeyArgs, { forbidUnknownValues: true }).catch(firstError)
  const { keyId } = buyKeyArgs

  const authUser: User = await authenticate(ctx)

  await rateLimit(authUser._id)

  let key = await KeyModel.findOne({ _id: keyId }).lean()
  if (!key) throw new ResponseError(404, 'Key not found')

  let seller = await UserModel.findOne({ _id: key.sellerId }).lean()
  if (!seller) throw new ResponseError(404, 'Seller not found')

  if (seller.username === authUser.username) throw new ResponseError(400, 'You cannot buy your own keys')

  const response: BuyKeyOutputs = { key: '' as unknown as Key, transactionHash: '' as unknown as string}

  ctx.status = 200
  ctx.body = response

  await next()
}
