import { Context, Next } from 'koa'
import { ObjectId } from 'mongodb'

import { CommentModel } from '../../../shared/comment/Comment'
import { TargetType } from '../../../shared/comment/TargetType'
import { Jwt } from '../../../shared/user/Jwt'
import { User } from '../../../shared/user/User'
import { createTestUser } from '../../../test/createTestUser'
import { deleteTestUser } from '../../../test/deleteTestUser'
import { mockConnect } from '../../../test/mockConnect'
import { newComment } from './newComment'

let user: User
let jwt: Jwt
let next: Next
let commentId1: ObjectId
let commentId2: ObjectId

describe('Comment', () => {
  beforeAll(async () => {
    await mockConnect()
    const created = await createTestUser('bob@test.com', 'bob', 'Bob1234#')
    user = created.user
    jwt = created.jwt
    next = created.next
  })

  it('can be created as comment', async (done) => {
    const ctx: Context = {
      request: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        body: {
          content: 'Test comment content',
          commentType: TargetType.COMMENT,
        },
      },
    } as Context

    await newComment(ctx, next)

    expect(ctx.status).toEqual(200)
    expect(ctx.body.comment).toBeDefined()
    expect(ctx.body.user).toBeDefined()

    commentId1 = ctx.body.comment._id
    done()
  })

  it('can be created as post', async (done) => {
    const ctx: Context = {
      request: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        body: {
          title: 'Test post',
          content: 'Test post content',
          commentType: TargetType.POST,
        },
      },
    } as Context

    await newComment(ctx, next)

    expect(ctx.status).toEqual(200)
    expect(ctx.body.comment).toBeDefined()
    expect(ctx.body.user).toBeDefined()

    commentId2 = ctx.body.comment._id
    done()
  })

  afterAll(async () => {
    await CommentModel.deleteOne({ _id: commentId1 }).exec()
    await CommentModel.deleteOne({ _id: commentId2 }).exec()
    await deleteTestUser(user._id)
  })
})
