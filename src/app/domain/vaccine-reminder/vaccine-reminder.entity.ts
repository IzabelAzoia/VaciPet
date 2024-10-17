import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { VaccineEntity } from '../vaccine/vaccine.entity';
import { ReminderEntity } from '../reminder/reminder.entity';
import { PetEntity } from '../pet/pet.entity';
import { TutorEntity } from '../tutor/tutor.entity';

@Entity({ name: 'vaccine_reminders' })
export class VaccineReminderEntity extends ReminderEntity {
  @Column()
  @ApiProperty({ description: 'Number of doses for the vaccine' })
  doses: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Interval between doses (if applicable), in days',
  })
  intervalBetweenDoses?: number;

  @ManyToOne(() => VaccineEntity, (vaccine) => vaccine.reminders, {
    eager: true,
  })
  @ManyToOne(() => VaccineEntity, (vaccine) => vaccine.reminders)
  @ApiProperty({ description: 'Vaccine associated with the reminder' })
  vaccine: VaccineEntity;

  @Column()
  @ApiProperty({ description: 'Date of the first dose' })
  firstDoseDate: Date;

  @Column()
  @ApiProperty({ description: 'Name of the vaccine' })
  name: string;

  constructor(
    doses: number,
    firstDoseDate: Date,
    name: string,
    reminderDate: Date,
    status: string,
    description: string,
    vaccineName: string,
    vaccineDate: Date,
    applicationStatus: string,
    tutor: TutorEntity,
    vaccine: VaccineEntity,
    pet: PetEntity,
    intervalBetweenDoses?: number,
  ) {
    super(
      reminderDate,
      status,
      description,
      vaccineDate,
      vaccineName,
      applicationStatus,
      tutor,
      vaccine,
      pet,
    );
    this.doses = doses;
    this.firstDoseDate = firstDoseDate;
    this.name = name;
    this.vaccine = vaccine;
    this.intervalBetweenDoses = intervalBetweenDoses;
  }
}
