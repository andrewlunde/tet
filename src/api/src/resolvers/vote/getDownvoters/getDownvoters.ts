import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { PublicUser } from '../../../shared/user/PublicUser'
import { UserModel } from '../../../shared/user/User'
import { GetDownvotersInputs, GetDownvotersOutputs } from '../../../shared/vote/GetDownvoters'
import { Vote, VoteModel } from '../../../shared/vote/Vote'
import { VoteDirection } from '../../../shared/vote/VoteDirection'
import { PUBLIC_USER_MONGO_SELECTOR } from '../../page/getPublicUser/getPublicUser'

export const getDownvoters = async (ctx: Context, next: Next): Promise<void> => {
  const getDownvotersArgs = plainToClass(GetDownvotersInputs, ctx.request.body, {
    excludeExtraneousValues: true,
  })
  await validateOrReject(getDownvotersArgs, { forbidUnknownValues: true }).catch(firstError)
  const { pageDownvoters = 0, commentId } = getDownvotersArgs

  let votes: Vote[] = await VoteModel.find({ commentId, voteDirection: VoteDirection.DOWN }, null, {
    limit: 20,
    skip: pageDownvoters * 20,
    sort: { createdAt: -1 },
  }).lean()
  if (!votes || votes.length === 0) votes = []

  const userIds = votes.map((vote) => vote.userId)
  let users: PublicUser[] = await UserModel.find({ _id: { $in: userIds } }, PUBLIC_USER_MONGO_SELECTOR).lean()
  if (!users || users.length === 0) users = []

  const response: GetDownvotersOutputs = { downvoters: users }

  ctx.status = 200
  ctx.body = response

  await next()
}
