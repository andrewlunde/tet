//prettier-ignore
import { hash } from 'bcryptjs'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

// import * as thetajs from "@thetalabs/theta-js";

import { firstError } from '../../../helpers/firstError'
import { toPublicUser } from '../../../helpers/toPublicUser'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { StatModel } from '../../../shared/stat/Stat'
import { StatType } from '../../../shared/stat/StatType'
import { Jwt } from '../../../shared/user/Jwt'
import { PublicUser } from '../../../shared/user/PublicUser'
import { SignUpInputs, SignUpOutputs } from '../../../shared/user/SignUp'
import { User, UserModel } from '../../../shared/user/User'
import { getSignedJwt } from '../helpers/getSignedJwt'

const thetajs: any = require('@thetalabs/theta-js')

export const signUp = async (ctx: Context, next: Next): Promise<void> => {
  const signUpArgs = plainToClass(SignUpInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(signUpArgs, { forbidUnknownValues: true }).catch(firstError)
  let { username, email, password } = signUpArgs

  username = username.toLowerCase()
  email = email.toLowerCase()

  const emailAlreadyTaken: User | null = await UserModel.findOne({ email }).lean()
  if (emailAlreadyTaken) throw new ResponseError(400, 'Email is already taken')

  const usernameAlreadyTaken: User | null = await UserModel.findOne({ username }).lean()
  if (usernameAlreadyTaken) throw new ResponseError(400, 'Username is already taken')

  // //Grab your Hedera testnet account ID and private key from your .env file
  // const myAccountId = process.env.MY_ACCOUNT_ID
  // const myPrivateKey = process.env.MY_PRIVATE_KEY

  // // If we weren't able to grab it, we should throw a new error
  // if (myAccountId == null || myPrivateKey == null) {
  //   throw new Error('Environment variables myAccountId and myPrivateKey must be present')
  // }

  // // Create our connection to the Hedera network
  // // The Hedera JS SDK makes this reallyyy easy!
  // const client = Client.forTestnet()

  // client.setOperator(myAccountId, myPrivateKey)

  // //Create new keys
  // const newAccountPrivateKey = await Ed25519PrivateKey.generate()
  // const newAccountPublicKey = newAccountPrivateKey.publicKey

  // const newAccountTransactionResponse = await new AccountCreateTransaction()
  //   .setKey(newAccountPublicKey)
  //   .setInitialBalance(100000000000)
  //   .execute(client)

  // // Get the new account ID
  // const getReceipt = await newAccountTransactionResponse.getReceipt(client)
  // const newAccountId = getReceipt.getAccountId()

  // console.log('The new account ID is: ' + newAccountId)

  // //Verify the account balance
  // const accountBalance = await new AccountBalanceQuery().setAccountId(newAccountId).execute(client)

  // console.log('The new account balance is: ' + accountBalance + ' hbar.')

  // const hashedPassword = await hash(password, 12)

  const provider = new thetajs.providers.HttpProvider(thetajs.networks.ChainIds.Testnet) // TestnetSapphire

  console.log(provider)

  const wallet = thetajs.Wallet.createRandom()

  console.log(wallet)

  const mnemonic = wallet._mnemonic().phrase

  // const account = await provider.getAccount(wallet.address);
  // FAILS BECAUSE OF ERROR IN ERROR IN @thetalabs/theta-js : "Fetch is not defined"

  const hashedPassword = await hash(password, 12)
  const user: User = await UserModel.create({
    email,
    username,
    hashedPassword,
    mnemonic: wallet._mnemonic().phrase,
    balance: 100,
    profilePicture: `https://f000.backblazeb2.com/file/pics-provider/profiles/${Math.floor(Math.random() * 2376)}.jpg`,
  } as User)
  const publicUser: PublicUser = toPublicUser(user)

  const jwt: Jwt = getSignedJwt(user._id.toHexString(), user.username)

  //const captcha: Captcha = await createCaptcha(user._id, CaptchaFor.CAPTCHA_FOR_VERIFY_EMAIL)

  // Increment USERS stat
  await StatModel.findOneAndUpdate(
    { statType: StatType.USERS },
    {
      $inc: { count: 1 },
    },
    { upsert: true, setDefaultsOnInsert: true },
  ).exec()

  // await sendEmailVerifyEmail(user.email, captcha.index)

  const response: SignUpOutputs = { jwt, user: publicUser, mnemonic }

  ctx.status = 200
  ctx.body = response

  await next()
}
