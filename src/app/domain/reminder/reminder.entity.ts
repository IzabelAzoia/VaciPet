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
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'reminders' })
export class ReminderEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id!: string;

  @Column()
  @ApiProperty({ description: 'Date when the reminder will be sent' })
  @IsDate()
  @IsNotEmpty()
  reminderDate: Date;

  @Column({ default: 'pending' })
  @ApiProperty({ description: 'Status of the reminder: Pending, Sent' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @Column()
  @ApiProperty({ description: 'Description of the reminder' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column()
  @ApiProperty({ description: 'Nome da vacina' })
  @IsString()
  @IsNotEmpty()
  vaccineName: string;

  @Column()
  @ApiProperty({ description: 'Data esperada para aplicação da vacina' })
  @IsDate()
  @IsNotEmpty()
  vaccineDate: Date;

  @Column()
  @ApiProperty({
    description: 'Status da aplicação da vacina: Aplicada ou Não Aplicada',
  })
  @IsString()
  @IsNotEmpty()
  applicationStatus: string;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.reminders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ description: 'Tutor who will receive the reminder' })
  tutor: TutorEntity;

  @ManyToOne(() => VaccineEntity, (vaccine) => vaccine.reminders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ description: 'Vaccine associated with the reminder' })
  vaccine: VaccineEntity;

  @ManyToOne(() => PetEntity, (pet) => pet.reminders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ description: 'Pet associated with the reminder' })
  pet: PetEntity;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation date of the reminder' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date of the last update of the reminder' })
  updatedAt: Date;

  constructor(
    reminderDate: Date,
    status: string,
    description: string,
    vaccineDate: Date,
    vaccineName: string,
    applicationStatus: string,
    tutor: TutorEntity,
    vaccine: VaccineEntity,
    pet: PetEntity,
  ) {
    this.reminderDate = reminderDate;
    this.status = status;
    this.description = description;
    this.vaccineName = vaccineName;
    this.vaccineDate = vaccineDate;
    this.applicationStatus = applicationStatus;
    this.tutor = tutor;
    this.vaccine = vaccine;
    this.pet = pet;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
