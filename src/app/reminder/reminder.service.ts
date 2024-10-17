import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReminderDto } from '../domain/reminder/create-reminder.dto';
import { ReminderEntity } from '../domain/reminder/reminder.entity';
import { Repository } from 'typeorm';
import { TutorEntity } from '../domain/tutor/tutor.entity';

@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(ReminderEntity)
    private readonly reminderRepository: Repository<ReminderEntity>,
  ) {}

  async create(createReminderDto: CreateReminderDto): Promise<ReminderEntity> {
    const reminder = this.reminderRepository.create({
      description: createReminderDto.description,
      reminderDate: createReminderDto.reminderDate,
      status: createReminderDto.status || 'pending',
      tutor: { id: createReminderDto.tutorId } as TutorEntity,
    });
    return await this.reminderRepository.save(reminder);
  }

  async findAll(): Promise<ReminderEntity[]> {
    return await this.reminderRepository.find();
  }

  async findOne(id: string): Promise<ReminderEntity | null> {
    return await this.reminderRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.reminderRepository.delete(id);
  }
}
