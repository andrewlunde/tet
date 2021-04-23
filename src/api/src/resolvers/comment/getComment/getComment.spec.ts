import { Context, Next } from 'koa'
import { ObjectId } from 'mongodb'

import { Comment, CommentModel } from '../../../shared/comment/Comment'
import { TargetType } from '../../../shared/comment/TargetType'
import { User, UserModel } from '../../../shared/user/User'
import { createTestUser } from '../../../test/createTestUser'
import { deleteTestUser } from '../../../test/deleteTestUser'
import { mockConnect } from '../../../test/mockConnect'
import { getComment } from './getComment'

let user: User
let next: Next
let commentId: string

describe('Comment', () => {
  beforeAll(async () => {
    await mockConnect()
    const created = await createTestUser('bob@test.com', 'bob', 'Bob1234#')
    user = created.user
    next = created.next
  })

  it('can be queried with author user', async (done) => {
    const testComment: Comment = await CommentModel.create({
      userId: user._id,
      content: 'test comment',
      commentType: TargetType.COMMENT,
    } as Comment)

    commentId = testComment._id.toHexString()

    const ctx: Context = {
      request: {
        headers: {},
        body: {
          commentId,
        },
      },
    } as Context

    await getComment(ctx, next)

    expect(ctx.status).toEqual(200)
    expect(ctx.body.comment).toBeDefined()
    expect(ctx.body.comment._id).toEqual(testComment._id)
    expect(ctx.body.user).toBeDefined()
    expect(ctx.body.user._id).toEqual(user._id)
    const publicUserAsUser: User = ctx.body.user as User
    expect(publicUserAsUser.hashedPassword).toBeUndefined()
    done()
  })

  it('throws if user not found', async () => {
    try {
      const ctx: Context = {
        request: {
          body: {
            commentId,
          },
        },
      } as Context

      await UserModel.deleteOne({ _id: user._id }).exec()

      await getComment(ctx, next)
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBe('User not found')
    }
  })

  it('throws if comment not found', async () => {
    try {
      const ctx: Context = {
        request: {
          headers: {},
          body: {
            commentId: new ObjectId().toHexString(),
          },
        },
      } as Context

      await getComment(ctx, next)
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBe('Comment not found')
    }
  })

  afterAll(async () => {
    await CommentModel.deleteOne({ _id: commentId }).exec()
    await deleteTestUser(user._id)
  })
})
