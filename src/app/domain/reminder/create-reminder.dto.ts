import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ID of the pet associated with the reminder' })
  petId: string; // Adicionando petId como propriedade

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the vaccine associated with the reminder',
  })
  vaccineId: string; // Adicionando vaccineId como propriedade

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

  constructor(
    petId: string,
    vaccineId: string,
    description: string,
    reminderDate: Date,
    tutorId: string,
    status?: string,
  ) {
    this.petId = petId;
    this.vaccineId = vaccineId;
    this.description = description;
    this.reminderDate = reminderDate;
    this.tutorId = tutorId;
    this.status = status || 'pending';
  }
}
