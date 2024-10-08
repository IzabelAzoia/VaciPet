import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ description: 'Nome do pet' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Tipo de pet (cachorro, gato, etc.)' })
  type: string;

  @ApiProperty({ description: 'Data de nascimento do pet' })
  @IsNotEmpty()
  birthDate: string;
}
