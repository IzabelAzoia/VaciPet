import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePetDto {
  @ApiProperty({ description: 'Pet name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Pet type (dog, cat, etc.)' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ description: 'Pet birth date' })
  @IsOptional()
  birthDate?: string;
}
