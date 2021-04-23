import { Context, Next } from 'koa'
import { ObjectId } from 'mongodb'

import { Comment, CommentModel } from '../../../shared/comment/Comment'
import { TargetType } from '../../../shared/comment/TargetType'
import { User } from '../../../shared/user/User'
import { createTestUser } from '../../../test/createTestUser'
import { deleteTestUser } from '../../../test/deleteTestUser'
import { mockConnect } from '../../../test/mockConnect'
import { addCommentView } from './addCommentView'

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

  it('can have a view added', async (done) => {
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

    await addCommentView(ctx, next)

    expect(ctx.status).toEqual(200)

    const comment: Comment = (await CommentModel.findOne({ _id: commentId }).exec()) as Comment
    expect(comment).toBeDefined()
    expect(comment.viewCount).toEqual(1)
    done()
  })

  it('throws at invalid comment Id', async () => {
    try {
      const ctx: Context = {
        request: {
          headers: {},
          body: {
            commentId: new ObjectId().toHexString(),
          },
        },
      } as Context

      await addCommentView(ctx, next)
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
