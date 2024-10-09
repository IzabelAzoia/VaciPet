import { OmitType } from '@nestjs/swagger';
import { ReminderEntity } from '../domain/reminder/reminder.entity';

export class ReminderSwagger extends OmitType(ReminderEntity, [
  'createdAt',
  'updatedAt',
]) {}
