import { OmitType } from '@nestjs/swagger';
import { PetEntity } from '../domain/pet/pet.entity';

export class PetSwagger extends OmitType(PetEntity, [
  'createdAt',
  'updatedAt',
]) {}
