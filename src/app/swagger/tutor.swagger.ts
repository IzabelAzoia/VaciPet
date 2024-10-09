import { OmitType } from '@nestjs/swagger';
import { TutorEntity } from '../domain/tutor/tutor.entity';

export class TutorSwagger extends OmitType(TutorEntity, [
  'createdAt',
  'updatedAt',
]) {}
