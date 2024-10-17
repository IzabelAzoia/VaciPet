import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { ReminderEntity } from '../reminder/reminder.entity';
import { VaccineEntity } from '../vaccine/vaccine.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { TutorEntity } from '../tutor/tutor.entity';

@Entity({ name: 'pets' })
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id!: string;

  @Column()
  @ApiProperty({ description: 'Name of the pet' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @ApiProperty({ description: 'Type of pet (e.g., cat, dog)' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @Column()
  @ApiProperty({ description: 'Birth date of the pet' })
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @Column()
  @ApiProperty({ description: 'Breed of the pet' })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Image URL of the pet' })
  imageUrl?: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation date of the record' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date of the last update of the record' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @ApiProperty({ description: 'Date when the record was deleted' })
  deletedAt: Date | null;

  @OneToMany(() => ReminderEntity, (reminder) => reminder.pet)
  @ApiProperty({
    type: () => ReminderEntity,
    isArray: true,
    description: 'Reminders associated with the pet',
  })
  reminders: ReminderEntity[];

  @OneToMany(() => VaccineEntity, (vaccine) => vaccine.pet)
  @ApiProperty({
    type: () => VaccineEntity,
    isArray: true,
    description: 'Vaccines associated with the pet',
  })
  vaccines: VaccineEntity[];

  @ManyToOne(() => TutorEntity, (tutor) => tutor.pets, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ description: 'Tutor associated with the pet' })
  tutor: TutorEntity;

  constructor(
    name: string,
    type: string,
    birthDate: Date,
    breed: string,
    imageUrl: string,
    tutor: TutorEntity,
  ) {
    this.name = name;
    this.type = type;
    this.birthDate = birthDate;
    this.breed = breed;
    this.imageUrl = imageUrl;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
    this.reminders = [];
    this.vaccines = [];
    this.tutor = tutor;
  }
}
