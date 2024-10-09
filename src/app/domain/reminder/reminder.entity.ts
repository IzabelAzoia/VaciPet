import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TutorEntity } from '../tutor/tutor.entity';
import { VaccineEntity } from '../vaccine/vaccine.entity';
import { PetEntity } from '../pet/pet.entity';

@Entity({ name: 'reminders' })
export class ReminderEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty({ description: 'Date when the reminder will be sent' })
  reminderDate: Date;

  @Column({ default: 'pending' })
  @ApiProperty({ description: 'Status of the reminder: Pending, Sent' })
  status: string;

  @Column()
  @ApiProperty({ description: 'Description of the reminder' })
  description: string;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.reminders)
  @ApiProperty({ description: 'Tutor who will receive the reminder' })
  tutor: TutorEntity;

  @ManyToOne(() => VaccineEntity, (vaccine) => vaccine.reminders)
  @ApiProperty({ description: 'Vaccine associated with the reminder' })
  vaccine: VaccineEntity;

  @ManyToOne(() => PetEntity, (pet) => pet.reminders)
  @ApiProperty({ description: 'Pet associated with the reminder' })
  pet: PetEntity;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation date of the reminder' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date of the last update of the reminder' })
  updatedAt: Date;
}
