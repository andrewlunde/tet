import { Context, Next } from 'koa'

import { CreateVideosOutputs } from '../../../shared/video/CreateVideos'
import { Video, VideoModel } from '../../../shared/video/Video'

export const createVideos = async (ctx: Context, next: Next): Promise<void> => {

  await VideoModel.remove({}).exec()


  const videos: Video[] = await VideoModel.insertMany([
  {
    title: 'Javascript Classes',
    slug: 'javascript-classes',
    creator: 'CodeCamp',
    imageUrl: 'https://f000.backblazeb2.com/file/tetuniversity/javascript.webp',
    videoUrl: 'https://f000.backblazeb2.com/file/tetuniversity/javascript.mp4',
    note: 4.3,
    noteCount: 1241
  },
  {
    title: 'Gentle Yoga Classes',
    slug: 'gentle-yoga-classes',
    creator: 'YogiAproved',
    imageUrl: 'https://f000.backblazeb2.com/file/tetuniversity/yoga.webp',
    videoUrl: 'https://f000.backblazeb2.com/file/tetuniversity/yoga.mp4',
    note: 4.7,
    noteCount: 2975
  },
  {
    title: 'Piano Classes',
    slug: 'piano-classes',
    creator: 'Pianote',
    imageUrl: 'https://f000.backblazeb2.com/file/tetuniversity/piano.webp',
    videoUrl: 'https://f000.backblazeb2.com/file/tetuniversity/piano.mp4',
    note: 3.2,
    noteCount: 732
  },
  {
    title: 'MBA Classes',
    slug: 'mba-classes',
    creator: 'BusinessSchool',
    imageUrl: 'https://f000.backblazeb2.com/file/tetuniversity/mba.webp',
    videoUrl: 'https://f000.backblazeb2.com/file/tetuniversity/mba.mp4',
    note: 4.7,
    noteCount: 56631
  },
  {
    title: 'Nutrition Classes',
    slug: 'nutrition-classes',
    creator: 'HomeCenter',
    imageUrl: 'https://f000.backblazeb2.com/file/tetuniversity/food.webp',
    videoUrl: 'https://f000.backblazeb2.com/file/tetuniversity/food.mp4',
    note: 4.4,
    noteCount: 112
  },
  {
    title: 'Self Defense Classes',
    slug: 'self-defense-classes',
    creator: 'Gracie',
    imageUrl: 'https://f000.backblazeb2.com/file/tetuniversity/defense.webp',
    videoUrl: 'https://f000.backblazeb2.com/file/tetuniversity/defense.mp4',
    note: 4.1,
    noteCount: 9410
  },
  {
    title: 'Design Classes',
    slug: 'design-classes',
    creator: 'UlaBurgiel',
    imageUrl: 'https://f000.backblazeb2.com/file/tetuniversity/design.webp',
    videoUrl: 'https://f000.backblazeb2.com/file/tetuniversity/design.mp4',
    note: 2.6,
    noteCount: 391
  },
  {
    title: 'Drawing Classes',
    slug: 'drawing-classes',
    creator: 'MasterMind',
    imageUrl: 'https://f000.backblazeb2.com/file/tetuniversity/drawing.webp',
    videoUrl: 'https://f000.backblazeb2.com/file/tetuniversity/drawing.mp4',
    note: 4.6,
    noteCount: 198
  }
  ] as Video[])

  console.log(videos)

  const response: CreateVideosOutputs = { ok: true }

  ctx.status = 200
  ctx.body = response

  await next()
}
