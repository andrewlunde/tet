import { Context, Next } from 'koa'

import { GetStatsOutputs } from '../../../shared/stat/GetStats'
import { StatModel } from '../../../shared/stat/Stat'

export const getStats = async (ctx: Context, next: Next): Promise<void> => {
  
  const stats = await StatModel.find({ }).lean()
  
  const reponse: GetStatsOutputs = { stats }

  ctx.status = 200
  ctx.body = reponse

  await next()
}
