import { OmitType } from '@nestjs/swagger';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';

export class indexVaccineSwagger extends OmitType(VaccineEntity, [
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}
