import { Controller, Post, Body } from '@nestjs/common';
import { VaccineReminderService } from './vaccine-reminder.service';
import { PetEntity } from '../domain/pet/pet.entity';
import { TutorEntity } from '../domain/tutor/tutor.entity';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';

@Controller('vaccine-reminder')
export class VaccineReminderController {
  constructor(
    private readonly vaccineReminderService: VaccineReminderService,
  ) {}

  @Post()
  createReminder(
    @Body('name') name: string,
    @Body('doses') doses: number,
    @Body('firstDoseDate') firstDoseDate: Date,
    @Body('reminderDate') reminderDate: Date,
    @Body('tutor') tutor: TutorEntity,
    @Body('status') status: string = 'pending',
    @Body('vaccine') vaccine: VaccineEntity,
    @Body('pet') pet: PetEntity,
    @Body('intervalBetweenDoses') intervalBetweenDoses?: number,
  ) {
    return this.vaccineReminderService.createReminder(
      name,
      doses,
      firstDoseDate,
      reminderDate,
      tutor,
      status,
      vaccine,
      pet,
      intervalBetweenDoses,
    );
  }
}
