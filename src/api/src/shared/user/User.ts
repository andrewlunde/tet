import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsMongoId, IsOptional, IsUrl, Length, Matches } from 'class-validator'
import { ObjectId } from 'mongodb'

import { getModel, Index, Property } from '../../helpers/typegoose'
import { UserRole } from './UserRole'

@Index({ moderationStatus: 1 })
export class User {
  @IsMongoId()
  readonly _id!: ObjectId

  @Property({ required: true, unique: true, index: true })
  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  username!: string

  @Property({ required: true, unique: true, index: true })
  @IsEmail()
  email!: string

  @Property({ required: true, unique: true, index: true })
  @Length(10, 100)
  mnemonic!: string

  @Property({ required: true, unique: true, index: true })
  balance!: number

  @Property({ nullable: true, optional: true })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean

  @Property({ required: true })
  hashedPassword!: string

  @Property({ nullable: true, optional: true })
  @IsOptional()
  @Length(8, 100)
  @IsUrl()
  @Matches(/^https:\/\/b2.tet.university\/file\/[a-zA-Z0-9_.\/-]*/, {
    message: 'Image URL must be from tet.university',
  })
  profilePicture?: string

  @Property({ nullable: true, optional: true })
  @IsOptional()
  @IsEnum(UserRole)
  userRole?: UserRole

  @Property({ nullable: true, optional: true })
  @IsOptional()
  @IsInt()
  sellCount?: number

  @IsDate()
  createdAt!: Date

  @IsDate()
  updatedAt!: Date
}

export const UserModel = getModel(User, { schemaOptions: { timestamps: true } })
