import { IsNotEmpty, IsIn, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVaccineDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Vaccine name' })
  vaccineName: string;

  @IsDateString()
  @ApiProperty({ description: 'Expected date for the vaccine application' })
  vaccineDate: string;

  @IsNotEmpty()
  @IsIn(['Applied', 'Not Applied'])
  @ApiProperty({ description: 'Status of the vaccine application' })
  applicationStatus: string;
}
