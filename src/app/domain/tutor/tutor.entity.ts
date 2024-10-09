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

@Entity({ name: 'tutors' })
export class TutorEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty({ description: 'Full name of the tutor' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Email of the tutor' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Phone number of the tutor' })
  phone: string;

  @OneToMany(() => ReminderEntity, (reminder) => reminder.tutor)
  @ApiProperty({ description: 'Reminders associated with the tutor' })
  reminders: ReminderEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
