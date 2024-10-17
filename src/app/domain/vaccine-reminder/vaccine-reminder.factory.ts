import { PetEntity } from '../pet/pet.entity';
import { TutorEntity } from '../tutor/tutor.entity';
import { VaccineEntity } from '../vaccine/vaccine.entity';
import { VaccineReminderEntity } from './vaccine-reminder.entity';

export class VaccineReminderFactory {
  static create(
    reminderDate: Date,
    status: string = 'pending',
    description: string,
    doses: number,
    firstDoseDate: Date,
    tutor: TutorEntity,
    vaccine: VaccineEntity,
    pet: PetEntity,
    intervalBetweenDoses?: number,
  ): VaccineReminderEntity {
    const vaccineReminder = new VaccineReminderEntity(
      doses,
      firstDoseDate,
      vaccine.vaccineName,
      reminderDate,
      status,
      description,
      vaccine.vaccineName,
      new Date(),
      status,
      tutor,
      vaccine,
      pet,
      intervalBetweenDoses,
    );

    return vaccineReminder;
  }
}
