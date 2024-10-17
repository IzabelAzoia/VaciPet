import { OmitType } from '@nestjs/swagger';
import { VaccineReminderEntity } from '../domain/vaccine-reminder/vaccine-reminder.entity';

export class VaccineReminderSwagger extends OmitType(VaccineReminderEntity, [
  'createdAt',
  'updatedAt',
]) {}
