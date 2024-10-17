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
import { CreateVaccineDto } from '../domain/vaccine/create-vaccine.dto';
import { VaccineService } from './vaccine.service';

@ApiTags('vaccines')
@Controller('api/v1/vaccines')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Get()
  @ApiOperation({ summary: 'List all vaccines' })
  @ApiResponse({
    status: 200,
    description: 'List of vaccines returned successfully',
    type: CreateVaccineDto,
    isArray: true,
  })
  async index() {
    return await this.vaccineService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Register a new vaccine' })
  @ApiResponse({ status: 201, description: 'Vaccine registered successfully' })
  async create(@Body() createVaccineDto: CreateVaccineDto) {
    return await this.vaccineService.create(createVaccineDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Display the details of a vaccine' })
  @ApiResponse({
    status: 200,
    description: 'Vaccine details returned successfully',
  })
  @ApiResponse({ status: 404, description: 'Vaccine not found' })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.vaccineService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the status of a vaccine' })
  @ApiResponse({
    status: 200,
    description: 'Vaccine status updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Vaccine not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVaccineDto: CreateVaccineDto,
  ) {
    return await this.vaccineService.update(id, updateVaccineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a vaccine' })
  @ApiResponse({ status: 204, description: 'Vaccine removed successfully' })
  @ApiResponse({ status: 404, description: 'Vaccine not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.vaccineService.deleteById(id);
  }
}
