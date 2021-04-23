import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { PublicUser } from '../../../shared/user/PublicUser'
import { UserModel } from '../../../shared/user/User'
import { GetUpvotersInputs, GetUpvotersOutputs } from '../../../shared/vote/GetUpvoters'
import { Vote, VoteModel } from '../../../shared/vote/Vote'
import { VoteDirection } from '../../../shared/vote/VoteDirection'
import { PUBLIC_USER_MONGO_SELECTOR } from '../../page/getPublicUser/getPublicUser'

export const getUpvoters = async (ctx: Context, next: Next): Promise<void> => {
  const getUpvotersArgs = plainToClass(GetUpvotersInputs, ctx.request.body, {
    excludeExtraneousValues: true,
  })
  await validateOrReject(getUpvotersArgs, { forbidUnknownValues: true }).catch(firstError)
  const { pageUpvoters = 0, commentId } = getUpvotersArgs

  let votes: Vote[] = await VoteModel.find({ commentId, voteDirection: VoteDirection.UP }, null, {
    limit: 20,
    skip: pageUpvoters * 20,
    sort: { createdAt: -1 },
  }).lean()
  if (!votes || votes.length === 0) votes = []

  const userIds = votes.map((vote) => vote.userId)
  let users: PublicUser[] = await UserModel.find({ _id: { $in: userIds } }, PUBLIC_USER_MONGO_SELECTOR).lean()
  if (!users || users.length === 0) users = []

  const response: GetUpvotersOutputs = { upvoters: users }

  ctx.status = 200
  ctx.body = response

  await next()
}
