import axios from 'axios'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { GetGoogleImagesInputs, GetGoogleImagesOutputs } from '../../../shared/comment/GetGoogleImages'
import { QuotaType } from '../../../shared/quota/QuotaType'
import { User } from '../../../shared/user/User'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../../user/helpers/authenticate'

import getSlug = require('speakingurl')
import { ResponseError } from '../../../shared/mongo/ResponseError'

export const getGoogleImages = async (ctx: Context, next: Next): Promise<void> => {
  const getGoogleImagesArgs = plainToClass(GetGoogleImagesInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(getGoogleImagesArgs, { forbidUnknownValues: true }).catch(firstError)
  const { subject } = getGoogleImagesArgs

  const user: User = await authenticate(ctx)

  await rateLimit(user._id, QuotaType.GOOGLE_REQUEST)

  const response = await axios({
    method: 'get',
    url: `https://www.googleapis.com/customsearch/v1?q=${getSlug(subject)}&cx=010909920343243333663%3An3dwwpdz7yu&searchType=image&key=AIzaSyCI9BPlrvcZg9_-WgOGQpU24wYxJf0MpDk&num=10`,
    headers: {
        'content-type': 'application/json; charset=utf-8',
      },
  })

  if (!(response && response.data && response.data.items)) throw new ResponseError(404, 'No image found')

    const images = response.data.items
      .filter((el: any) => el.image && el.image.thumbnailWidth >= el.image.thumbnailHeight)
      .map((el: any) => el.image.thumbnailLink);

  const reponse: GetGoogleImagesOutputs = { images }

  ctx.status = 200
  ctx.body = reponse

  await next()
}
