import { Context, Next } from 'koa'

import { GetBalanceOutputs } from '../../../shared/user/GetBalance'
import { User } from '../../../shared/user/User'
import { authenticate } from '../helpers/authenticate'

export const getBalance = async (ctx: Context, next: Next): Promise<void> => {
  const authUser: User = await authenticate(ctx)

  const response: GetBalanceOutputs = { balance: authUser.balance }

  ctx.status = 200
  ctx.body = response

  await next()
}
