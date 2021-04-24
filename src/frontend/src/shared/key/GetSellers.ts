import { Expose } from 'class-transformer'
import { IsArray, IsMongoId } from 'class-validator'
import { ObjectId } from 'mongodb'

import { KeyUser } from './KeyUser'

export class ChargeInputs {
  @Expose()
  @IsMongoId()
  videoId!: ObjectId
}

export class ChargeOutputs {
  @Expose()
  @IsArray()
  keyUsers!: KeyUser[]
}
