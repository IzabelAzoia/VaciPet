import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ description: 'Pet name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Pet type (dog, cat, etc.)' })
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Pet birth date' })
  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @ApiProperty({ description: 'Pet breed' })
  @IsNotEmpty()
  breed: string;

  @ApiProperty({ description: 'Image Pet' })
  @IsNotEmpty()
  imageUrl?: string;

  constructor(
    name: string,
    type: string,
    birthDate: string,
    breed: string,
    imageUrl?: string,
  ) {
    this.name = name;
    this.type = type;
    this.birthDate = birthDate;
    this.breed = breed;
    this.imageUrl = imageUrl;
  }
}
