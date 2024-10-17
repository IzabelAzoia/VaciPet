import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReminderEntity } from '../../domain/reminder/reminder.entity';

@Injectable()
export class ReminderOrmRepository extends Repository<ReminderEntity> {}
