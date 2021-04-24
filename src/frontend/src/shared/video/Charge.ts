import { Expose } from 'class-transformer'
import { IsMongoId } from 'class-validator'
import { ObjectId } from 'mongodb'


export class ChargeInputs {
  @Expose()
  @IsMongoId()
  videoId!: ObjectId
}

export class ChargeOutputs {
}
