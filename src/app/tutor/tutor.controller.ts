import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTutorDto } from '../domain/tutor/create-tutor.dto';

@ApiTags('tutors')
@Controller('api/v1/tutors')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tutor' })
  @ApiResponse({ status: 201, description: 'Tutor created successfully' })
  async create(@Body() createTutorDto: CreateTutorDto) {
    return await this.tutorService.create(createTutorDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all tutors' })
  @ApiResponse({
    status: 200,
    description: 'List of tutors returned successfully',
  })
  async findAll() {
    return await this.tutorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific tutor' })
  @ApiResponse({
    status: 200,
    description: 'Tutor found',
  })
  @ApiResponse({ status: 404, description: 'Tutor not found' })
  async findOne(@Param('id') id: string) {
    return await this.tutorService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a tutor' })
  @ApiResponse({ status: 204, description: 'Tutor removed successfully' })
  async delete(@Param('id') id: string) {
    await this.tutorService.delete(id);
  }
}
