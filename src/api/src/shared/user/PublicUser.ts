import { IsDate, IsEmail, IsInt, IsMongoId, IsOptional, IsUrl, Length, Matches } from 'class-validator'
import { ObjectId } from 'mongodb'

export class PublicUser {
  @IsMongoId()
  readonly _id!: ObjectId

  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  username!: string

  @IsOptional()
  balance!: number
  
  @IsOptional()
  @IsEmail()
  emailVerified?: boolean

  @IsOptional()
  @IsUrl()
  profilePicture?: string

  @IsOptional()
  @IsInt()
  sellCount?: number

  @IsDate()
  createdAt!: Date
}
