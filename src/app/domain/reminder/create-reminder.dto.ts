import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Reminder description' })
  description: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: 'Reminder date and time' })
  reminderDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ID of the tutor who will receive the reminder' })
  tutorId: string;

  @IsString()
  @ApiProperty({ description: 'Status of the reminder (default is "pending")' })
  status?: string;

  constructor(description: string, reminderDate: Date, tutorId: string) {
    this.description = description;
    this.reminderDate = reminderDate;
    this.tutorId = tutorId;
  }
}
