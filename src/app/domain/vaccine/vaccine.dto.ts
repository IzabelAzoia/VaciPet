import { IsNotEmpty, IsIn, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVaccineDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da vacina' })
  nomeVacina: string;

  @IsDateString()
  @ApiProperty({ description: 'Data prevista para a aplicação da vacina' })
  dataVacina: string;

  @IsNotEmpty()
  @IsIn(['Aplicada', 'Não Aplicada'])
  @ApiProperty({ description: 'Status da aplicação da vacina' })
  statusAplicacao: string;
}
