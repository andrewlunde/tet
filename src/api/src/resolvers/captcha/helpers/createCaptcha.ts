import { ObjectId } from 'mongodb'
import * as crypto from 'crypto'

import { Captcha, CaptchaModel } from '../../../shared/captcha/Captcha'
import { CaptchaFor } from '../../../shared/captcha/CaptchaFor'
import { CaptchaPair } from '../../../shared/captcha/CaptchaPair'
import { getRandomCaptchaPair } from './getRandomCaptchaPair'

interface CreateCaptcha {
  (userId: ObjectId, captchaFor: CaptchaFor): Promise<Captcha>
}

export const createCaptcha: CreateCaptcha = async (userId, captchaFor) => {
  await CaptchaModel.deleteOne({ userId, captchaFor })

  const captchaPair: CaptchaPair = getRandomCaptchaPair()

  const captcha: Captcha = await CaptchaModel.create({
    userId,
    index: captchaPair.captchaIndex,
    solution: captchaPair.captchaSolution,
    token: crypto.randomBytes(16).toString('hex'),
    captchaFor,
  } as Captcha)

  return captcha
}
