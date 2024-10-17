import { IsNotEmpty, IsIn, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVaccineDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Vaccine name' })
  vaccineName: string;

  @IsDateString()
  @ApiProperty({ description: 'Expected date for the vaccine application' })
  vaccineDate: Date;

  @IsNotEmpty()
  @IsIn(['Applied', 'Not Applied'])
  @ApiProperty({ description: 'Status of the vaccine application' })
  applicationStatus: string;

  constructor(
    vaccineName: string,
    vaccineDate: Date,
    applicationStatus: string,
  ) {
    this.vaccineName = vaccineName;
    this.vaccineDate = vaccineDate;
    this.applicationStatus = applicationStatus;
  }
}
