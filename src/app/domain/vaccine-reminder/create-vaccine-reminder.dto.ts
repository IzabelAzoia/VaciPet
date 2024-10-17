import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsDateString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { VaccineEntity } from '../vaccine/vaccine.entity';
import { TutorEntity } from '../tutor/tutor.entity';

export class CreateVaccineReminderDto {
  @ApiProperty({ description: 'Nome da vacina' })
  @IsString()
  @IsNotEmpty()
  vaccineName: string;

  @ApiProperty({ description: 'Data esperada para aplicação da vacina' })
  @IsDateString()
  @IsNotEmpty()
  vaccineDate: Date;

  @ApiProperty({ description: 'Status da vacina: Aplicada ou Não Aplicada' })
  @IsString()
  @IsNotEmpty()
  applicationStatus: string;

  @ApiProperty({ description: 'Data quando o lembrete será enviado' })
  @IsDate()
  @IsNotEmpty()
  reminderDate: Date;

  @ApiProperty({ description: 'Status do lembrete: Pendente, Enviado' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'Descrição do lembrete' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Número de doses' })
  @IsNumber()
  @IsNotEmpty()
  doses: number;

  @ApiProperty({ description: 'Data da primeira dose' })
  @IsDateString()
  @IsNotEmpty()
  firstDoseDate: Date;

  @ApiProperty({ description: 'Nome do lembrete' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Intervalo entre as doses (opcional)' })
  @IsOptional()
  @IsNumber()
  intervalBetweenDoses?: number;

  @ApiProperty({ description: 'Entidade da vacina' })
  @IsNotEmpty()
  vaccine: VaccineEntity;

  @ApiProperty({ description: 'Entidade do tutor que receberá o lembrete' })
  @IsNotEmpty()
  tutor: TutorEntity; // Aqui você pode usar TutorEntity ou uma referência ao ID do tutor

  constructor(
    vaccineName: string,
    vaccineDate: Date,
    applicationStatus: string,
    reminderDate: Date,
    status: string,
    description: string,
    doses: number,
    firstDoseDate: Date,
    name: string,
    vaccine: VaccineEntity,
    tutor: TutorEntity, // Incluindo tutor no construtor
    intervalBetweenDoses?: number,
  ) {
    this.vaccineName = vaccineName;
    this.vaccineDate = vaccineDate;
    this.applicationStatus = applicationStatus;
    this.reminderDate = reminderDate;
    this.status = status;
    this.description = description;
    this.doses = doses;
    this.firstDoseDate = firstDoseDate;
    this.name = name;
    this.vaccine = vaccine;
    this.tutor = tutor; // Atribuindo tutor
    this.intervalBetweenDoses = intervalBetweenDoses;
  }
}
