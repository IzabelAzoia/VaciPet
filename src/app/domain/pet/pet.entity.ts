import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReminderEntity } from '../reminder/reminder.entity';
import { VaccineEntity } from '../vaccine/vaccine.entity';

import { ApiProperty } from '@nestjs/swagger'; // Importando o ApiProperty

@Entity({ name: 'pets' }) // Defines the name of the table in the database
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty() // Added for documentation
  public id: string;

  @Column()
  @ApiProperty({ description: 'Name of the pet' }) // Description for Swagger
  public name: string;

  @Column()
  @ApiProperty({ description: 'Type of pet (e.g., cat, dog)' }) // Description
  public type: string;

  @Column()
  @ApiProperty({ description: 'Birth date of the pet' }) // Description
  public birthDate: Date; // Corrected to Date

  @Column()
  @ApiProperty({ description: 'Breed of the pet' }) // Description
  public breed: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation date of the record' }) // Description
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date of the last update of the record' }) // Description
  updatedAt: Date;

  @OneToMany(() => ReminderEntity, (reminder) => reminder.pet)
  @ApiProperty({ type: () => ReminderEntity, isArray: true }) // Documenting the relationship
  public reminders: ReminderEntity[];

  @OneToMany(() => VaccineEntity, (vaccine) => vaccine.pet)
  @ApiProperty({ type: () => VaccineEntity, isArray: true }) // Documenting the relationship
  public vaccines: VaccineEntity[];
}
