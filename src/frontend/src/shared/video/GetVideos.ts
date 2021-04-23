import { Expose } from 'class-transformer'
import { IsArray } from 'class-validator'

import { Video } from './Video'

export class GetVideosInputs {
}

export class GetVideosOutputs {
  @Expose()
  @IsArray()
  videos!: Video[]
}
