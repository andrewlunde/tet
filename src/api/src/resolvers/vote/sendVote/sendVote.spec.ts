import { Context, Next } from 'koa'
import { ObjectId } from 'mongodb'

import { Comment, CommentModel } from '../../../shared/comment/Comment'
import { TargetType } from '../../../shared/comment/TargetType'
import { Jwt } from '../../../shared/user/Jwt'
import { User } from '../../../shared/user/User'
import { Vote, VoteModel } from '../../../shared/vote/Vote'
import { VoteDirection } from '../../../shared/vote/VoteDirection'
import { createTestUser } from '../../../test/createTestUser'
import { deleteTestUser } from '../../../test/deleteTestUser'
import { mockConnect } from '../../../test/mockConnect'
import { sendVote } from './sendVote'

let user: User
let jwt: Jwt
let next: Next
let commentId1: string
let commentId2: string

describe('Vote', () => {
  beforeAll(async () => {
    await mockConnect()
    const created = await createTestUser('bob@test.com', 'bob', 'Bob1234#')
    user = created.user
    jwt = created.jwt
    next = created.next

    const author = await createTestUser('mike@test.com', 'mike', 'Bob1234#')

    const testComment1: Comment = await CommentModel.create({
      userId: author.user._id,
      content: 'test comment 1',
      commentType: TargetType.COMMENT,
    } as Comment)

    commentId1 = testComment1._id.toHexString()

    const testComment2: Comment = await CommentModel.create({
      userId: new ObjectId(),
      content: 'test comment 1',
      commentType: TargetType.COMMENT,
    } as Comment)

    commentId2 = testComment2._id.toHexString()
  })

  it('can be created up', async (done) => {
    const ctx: Context = {
      request: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        body: {
          commentId: commentId1,
          voteDirection: VoteDirection.UP,
        },
      },
    } as Context

    await sendVote(ctx, next)

    expect(ctx.status).toEqual(200)

    const savedVote: Vote | null = await VoteModel.findOne({
      userId: user._id,
      commentId: commentId1,
    }).lean()
    expect(savedVote).toBeDefined()
    expect(savedVote && savedVote.voteDirection).toEqual(VoteDirection.UP)

    const modifiedComment: Comment | null = await CommentModel.findOne({
      _id: commentId1,
    }).lean()
    expect(modifiedComment).toBeDefined()
    expect(modifiedComment && modifiedComment.upCount).toEqual(2)
    expect(modifiedComment && modifiedComment.downCount).toBeUndefined()

    done()
  })

  it('can be reversed down', async (done) => {
    const ctx: Context = {
      request: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        body: {
          commentId: commentId1,
          voteDirection: VoteDirection.DOWN,
        },
      },
    } as Context

    await sendVote(ctx, next)

    expect(ctx.status).toEqual(200)

    const savedVote: Vote | null = await VoteModel.findOne({
      userId: user._id,
      commentId: commentId1,
    }).lean()
    expect(savedVote).toBeDefined()
    expect(savedVote && savedVote.voteDirection).toEqual(VoteDirection.DOWN)

    const modifiedComment: Comment | null = await CommentModel.findOne({
      _id: commentId1,
    }).lean()
    expect(modifiedComment).toBeDefined()
    expect(modifiedComment && modifiedComment.upCount).toEqual(1)
    expect(modifiedComment && modifiedComment.downCount).toEqual(1)

    done()
  })

  it('can be reversed again up', async (done) => {
    const ctx: Context = {
      request: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        body: {
          commentId: commentId1,
          voteDirection: VoteDirection.UP,
        },
      },
    } as Context

    await sendVote(ctx, next)

    expect(ctx.status).toEqual(200)

    const savedVote: Vote | null = await VoteModel.findOne({
      userId: user._id,
      commentId: commentId1,
    }).lean()
    expect(savedVote).toBeDefined()
    expect(savedVote && savedVote.voteDirection).toEqual(VoteDirection.UP)

    const modifiedComment: Comment | null = await CommentModel.findOne({
      _id: commentId1,
    }).lean()
    expect(modifiedComment).toBeDefined()
    expect(modifiedComment && modifiedComment.upCount).toEqual(2)
    expect(modifiedComment && modifiedComment.downCount).toEqual(0)

    done()
  })

  it('can be created down', async (done) => {
    const ctx: Context = {
      request: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        body: {
          commentId: commentId2,
          voteDirection: VoteDirection.DOWN,
        },
      },
    } as Context

    await sendVote(ctx, next)

    expect(ctx.status).toEqual(200)

    const savedVote: Vote | null = await VoteModel.findOne({
      userId: user._id,
      commentId: commentId2,
    }).lean()
    expect(savedVote).toBeDefined()
    expect(savedVote && savedVote.voteDirection).toEqual(VoteDirection.DOWN)

    const modifiedComment: Comment | null = await CommentModel.findOne({
      _id: commentId2,
    }).lean()
    expect(modifiedComment).toBeDefined()
    expect(modifiedComment && modifiedComment.upCount).toEqual(1)
    expect(modifiedComment && modifiedComment.downCount).toEqual(1)

    done()
  })

  it('can be reversed up', async (done) => {
    const ctx: Context = {
      request: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        body: {
          commentId: commentId2,
          voteDirection: VoteDirection.UP,
        },
      },
    } as Context

    await sendVote(ctx, next)

    expect(ctx.status).toEqual(200)

    const savedVote: Vote | null = await VoteModel.findOne({
      userId: user._id,
      commentId: commentId2,
    }).lean()
    expect(savedVote).toBeDefined()
    expect(savedVote && savedVote.voteDirection).toEqual(VoteDirection.UP)

    const modifiedComment: Comment | null = await CommentModel.findOne({
      _id: commentId2,
    }).lean()
    expect(modifiedComment).toBeDefined()
    expect(modifiedComment && modifiedComment.upCount).toEqual(2)
    expect(modifiedComment && modifiedComment.downCount).toEqual(0)

    done()
  })

  it('can be reversed again down', async (done) => {
    const ctx: Context = {
      request: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        body: {
          commentId: commentId2,
          voteDirection: VoteDirection.DOWN,
        },
      },
    } as Context

    await sendVote(ctx, next)

    expect(ctx.status).toEqual(200)

    const savedVote: Vote | null = await VoteModel.findOne({
      userId: user._id,
      commentId: commentId2,
    }).lean()
    expect(savedVote).toBeDefined()
    expect(savedVote && savedVote.voteDirection).toEqual(VoteDirection.DOWN)

    const modifiedComment: Comment | null = await CommentModel.findOne({
      _id: commentId2,
    }).lean()
    expect(modifiedComment).toBeDefined()
    expect(modifiedComment && modifiedComment.upCount).toEqual(1)
    expect(modifiedComment && modifiedComment.downCount).toEqual(1)

    done()
  })

  it('throws if already voted', async () => {
    try {
      const ctx: Context = {
        request: {
          headers: {
            authorization: 'Bearer ' + jwt,
          },
          body: {
            commentId: commentId2,
            voteDirection: VoteDirection.DOWN,
          },
        },
      } as Context

      await sendVote(ctx, next)

      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBe('Already voted')
    }
  })

  it('throws if comment not found', async () => {
    try {
      const ctx: Context = {
        request: {
          headers: {
            authorization: 'Bearer ' + jwt,
          },
          body: {
            commentId: new ObjectId().toHexString(),
            voteDirection: VoteDirection.DOWN,
          },
        },
      } as Context

      await sendVote(ctx, next)

      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBe('Comment not found')
    }
  })

  afterAll(async () => {
    await CommentModel.deleteOne({ _id: commentId1 }).exec()
    await CommentModel.deleteOne({ _id: commentId2 }).exec()
    await deleteTestUser(user._id)
  })
})
