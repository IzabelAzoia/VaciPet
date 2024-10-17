import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReminderDto } from '../domain/reminder/create-reminder.dto';
import { ReminderEntity } from '../domain/reminder/reminder.entity';
import { Repository } from 'typeorm';
import { TutorEntity } from '../domain/tutor/tutor.entity';
import { PetService } from '../pet/pet.service';
import { VaccineService } from '../vaccine/vaccine.service';

@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(ReminderEntity)
    private readonly reminderRepository: Repository<ReminderEntity>,

    private readonly petService: PetService,
    private readonly vaccineService: VaccineService,
  ) {}

  async create(createReminderDto: CreateReminderDto): Promise<ReminderEntity> {
    const pet = await this.petService.findPetById(createReminderDto.petId);
    const vaccine = await this.vaccineService.findOneOrFail(
      createReminderDto.vaccineId,
    );

    const reminder = this.reminderRepository.create({
      description: createReminderDto.description,
      reminderDate: createReminderDto.reminderDate,
      status: createReminderDto.status || 'pending',
      tutor: { id: createReminderDto.tutorId } as TutorEntity,
      pet: {
        ...pet,
      },
      vaccine: {
        ...vaccine,
        applicationStatus: vaccine.applicationStatus || 'Not Applied',
      },
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
