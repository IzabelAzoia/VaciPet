import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ReminderEntity } from '../reminder/reminder.entity';
import { PetEntity } from '../pet/pet.entity';

@Entity({ name: 'vaccines' })
export class VaccineEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty({ description: 'Vaccine name' })
  vaccineName: string;

  @Column()
  @ApiProperty({ description: 'Expected date for application' })
  vaccineDate: Date;

  @Column()
  @ApiProperty({ description: 'Vaccine status: Applied or Not Applied' })
  applicationStatus: string;

  @ManyToOne(() => PetEntity, (pet) => pet.vaccines)
  @ApiProperty({ description: 'Pet receiving the vaccine' })
  pet: PetEntity;

  @OneToMany(() => ReminderEntity, (reminder) => reminder.vaccine)
  @ApiProperty({ description: 'Reminders associated with this vaccine' })
  reminders: ReminderEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  constructor(
    id: string,
    vaccineName: string,
    vaccineDate: Date,
    applicationStatus: string,
    pet: PetEntity,
    reminders: ReminderEntity[] = [],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null = null,
  ) {
    this.id = id;
    this.vaccineName = vaccineName;
    this.vaccineDate = vaccineDate;
    this.applicationStatus = applicationStatus;
    this.pet = pet;
    this.reminders = reminders;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
