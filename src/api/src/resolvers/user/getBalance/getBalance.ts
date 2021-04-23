import { Context, Next } from 'koa'

import { GetBalanceOutputs } from '../../../shared/user/GetBalance'
import { User } from '../../../shared/user/User'
import { authenticate } from '../helpers/authenticate'

export const getBalance = async (ctx: Context, next: Next): Promise<void> => {
  const authUser: User = await authenticate(ctx)

  const myAccountId = process.env.MY_ACCOUNT_ID
  const myPrivateKey = process.env.MY_PRIVATE_KEY

  if (myAccountId == null || myPrivateKey == null) {
    throw new Error('Environment variables myAccountId and myPrivateKey must be present')
  }


  console.log(
    "The new account balance is: " +
      authUser.mnemonic +
      " bar."
  );

  const response: GetBalanceOutputs = { balance: authUser.mnemonic as unknown as number }

  ctx.status = 200
  ctx.body = response

  await next()
}
