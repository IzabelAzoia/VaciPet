import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ description: 'Pet name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Pet type (dog, cat, etc.)' })
  type: string;

  @ApiProperty({ description: 'Pet birth date' })
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({ description: 'Pet breed' }) // Adding description for breed
  @IsNotEmpty() // Validation for breed
  breed: string; // New property added
}
