import { Context, Next } from 'koa'
import { ObjectId } from 'mongodb'

import { Comment, CommentModel } from '../../../shared/comment/Comment'
import { TargetType } from '../../../shared/comment/TargetType'
import { User } from '../../../shared/user/User'
import { createTestUser } from '../../../test/createTestUser'
import { deleteTestUser } from '../../../test/deleteTestUser'
import { mockConnect } from '../../../test/mockConnect'
import { getComments } from './getComments'

let user: User
let next: Next
let commentId1: string
let commentId2: string
const targetId = new ObjectId()

describe('Comment', () => {
  beforeAll(async () => {
    await mockConnect()
    const created = await createTestUser('bob@test.com', 'bob', 'Bob1234#')
    user = created.user
    next = created.next
  })

  it('latest comments can be queried', async (done) => {
    const testComment1: Comment = await CommentModel.create({
      userId: user._id,
      targetId,
      content: 'test comment 1',
      commentType: TargetType.COMMENT,
    } as Comment)

    commentId1 = testComment1._id.toHexString()

    const testComment2: Comment = await CommentModel.create({
      userId: user._id,
      targetId,
      content: 'test comment 2',
      commentType: TargetType.COMMENT,
    } as Comment)

    commentId2 = testComment2._id.toHexString()

    const ctx: Context = {
      request: {
        headers: {},
        body: {
          targetId,
        },
      },
    } as Context

    await getComments(ctx, next)

    expect(ctx.status).toEqual(200)
    expect(ctx.body.comments).toBeDefined()
    expect(ctx.body.comments.length).toEqual(2)
    expect(ctx.body.users).toBeDefined()
    expect(ctx.body.users.length).toEqual(1)

    done()
  })

  afterAll(async () => {
    await CommentModel.deleteOne({ _id: commentId1 }).exec()
    await CommentModel.deleteOne({ _id: commentId2 }).exec()
    await deleteTestUser(user._id)
  })
})
