import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTutorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Full name of the tutor' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email of the tutor' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Phone number of the tutor' })
  phone: string;
}
