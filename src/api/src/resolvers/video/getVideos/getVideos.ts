import { Context, Next } from 'koa'

import { Video, VideoModel } from '../../../shared/video/Video'
import { GetVideosOutputs } from '../../../shared/video/GetVideos'

export const getVideos = async (ctx: Context, next: Next): Promise<void> => {

  let videos: Video[] = await VideoModel.find({}, null, {
    sort: { createdAt: -1 },
  }).lean()

  const response: GetVideosOutputs = { videos }

  ctx.status = 200
  ctx.body = response

  await next()
}
