import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VaccineReminderEntity } from '../../domain/vaccine-reminder/vaccine-reminder.entity';

@Injectable()
export class VaccineReminderOrmRepository extends Repository<VaccineReminderEntity> {}
