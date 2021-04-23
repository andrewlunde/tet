import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { Report, ReportModel } from '../../../shared/report/Report'
import { User } from '../../../shared/user/User'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../../user/helpers/authenticate'
import { SendReportInputs, SendReportOutputs } from '../../../shared/report/SendReport'

export const sendReport = async (ctx: Context, next: Next): Promise<void> => {
  const sendReportArgs = plainToClass(SendReportInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(sendReportArgs, { forbidUnknownValues: true }).catch(firstError)
  const { targetType, targetId, reason } = sendReportArgs

  const user: User = await authenticate(ctx)

  await rateLimit(user._id)

  const report: Report = await ReportModel.create({
    userId: user._id,
    targetType,
    targetId,
    reason
  } as Report)

  const reponse: SendReportOutputs = { report }

  ctx.status = 200
  ctx.body = reponse

  await next()
}
