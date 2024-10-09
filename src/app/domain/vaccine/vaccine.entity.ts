import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
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
  vaccineDate: string;

  @Column()
  @ApiProperty({ description: 'Vaccine status: Applied or Not Applied' })
  applicationStatus: string;

  @ManyToOne(() => PetEntity, (pet) => pet.vaccines)
  @ApiProperty({ description: 'Pet receiving the vaccine' })
  @JoinTable()
  pet: PetEntity;

  @OneToMany(() => ReminderEntity, (reminder) => reminder.vaccine) // Adds the relationship here
  @ApiProperty({ description: 'Reminders associated with this vaccine' })
  reminders: ReminderEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  deletedAt: Date;
}
