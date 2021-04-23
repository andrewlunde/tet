import { Expose } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class CreateVideosInputs {
}

export class CreateVideosOutputs {
  @Expose()
  @IsBoolean()
  ok!: boolean
}
