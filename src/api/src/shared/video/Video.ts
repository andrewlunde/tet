// prettier-ignore
import { IsDate, IsMongoId, IsPositive, IsUrl, Length, Matches, Max } from 'class-validator'
import { ObjectId } from 'mongodb'

import { getModel, Property } from '../../helpers/typegoose'

export class Video {
  @IsMongoId()
  readonly _id!: ObjectId

  @Property({ nullable: true, optional: true })
  @IsMongoId()
  author?: ObjectId

  @Property({ required: true })
  @Length(2, 100)
  title!: string

  @Property({ required: true })
  @Length(2, 100)
  creator!: string

  @Property({ required: true })
  @Length(2, 100)
  @Matches(/^[a-zA-Z0-9_-]*$/, { message: 'Video can only contain letters, numbers, dashes and underscores' })
  slug!: string

  @Property({ required: true })
  @Length(2, 100)
  @IsUrl()
  imageUrl?: string

  @Property({ required: true })
  @Length(2, 100)
  @IsUrl()
  videoUrl?: string

  @Property({ nullable: true, optional: true })
  @IsPositive()
  @Max(5)
  note?: number

  @Property({ nullable: true, optional: true })
  @IsPositive()
  noteCount?: number

  @IsDate()
  createdAt!: Date

  @IsDate()
  updatedAt!: Date
}

export const VideoModel = getModel(Video, { schemaOptions: { timestamps: true } })
