import { EntityRepository, Repository } from 'typeorm';
import { ReminderEntity } from './reminder.entity';

@EntityRepository(ReminderEntity)
export class ReminderRepository extends Repository<ReminderEntity> {}
