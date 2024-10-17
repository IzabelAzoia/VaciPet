import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ReminderEntity } from '../reminder/reminder.entity';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { PetEntity } from '../pet/pet.entity';

@Entity({ name: 'tutors' })
export class TutorEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @OneToMany(() => PetEntity, (pet) => pet.tutor)
  @ApiProperty({
    type: () => PetEntity,
    isArray: true,
    description: 'Pets associated with the tutor',
  })
  pets: PetEntity[];

  @Column()
  @ApiProperty({ description: 'Full name of the tutor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Email of the tutor' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @ApiProperty({ description: 'Phone number of the tutor' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Column()
  @ApiProperty({
    description:
      ' Tutor password (minimum of 8 characters, including letters and numbers).',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @OneToMany(() => ReminderEntity, (reminder) => reminder.tutor)
  @ApiProperty({
    type: () => ReminderEntity,
    isArray: true,
    description: 'Reminders associated with the tutor',
  })
  reminders: ReminderEntity[];

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation date of the tutor record' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date of the last update of the tutor record' })
  updatedAt: Date;

  constructor(
    name: string,
    email: string,
    phone: string,
    password: string,
    reminders: ReminderEntity[] = [],
    pets: PetEntity[],
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = '';
    this.name = name;
    this.pets = pets;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.reminders = reminders;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
