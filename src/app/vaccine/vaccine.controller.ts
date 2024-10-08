import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateVaccineDto } from '../domain/vaccine/vaccine.dto';
import { VaccineService } from './vaccine.service';

@ApiTags('vaccines')
@Controller('api/v1/vacinas')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as vacinas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vacinas retornada com sucesso',
    type: CreateVaccineDto,
    isArray: true,
  })
  async index() {
    return await this.vaccineService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar uma nova vacina' })
  @ApiResponse({ status: 201, description: 'Vacina registrada com sucesso' })
  async create(@Body() createVaccineDto: CreateVaccineDto) {
    return await this.vaccineService.create(createVaccineDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de uma vacina' })
  @ApiResponse({
    status: 200,
    description: 'Dados da vacina retornados com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Vacina não encontrada' })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.vaccineService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar o status de uma vacina' })
  @ApiResponse({
    status: 200,
    description: 'Status da vacina atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Vacina não encontrada' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVaccineDto: CreateVaccineDto,
  ) {
    return await this.vaccineService.update(id, updateVaccineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma vacina' })
  @ApiResponse({ status: 204, description: 'Vacina removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Vacina não encontrada' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.vaccineService.deleteById(id);
  }
}
