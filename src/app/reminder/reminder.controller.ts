import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReminderDto } from '../domain/reminder/create-reminder.dto';

@ApiTags('reminders')
@Controller('api/v1/reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reminder' })
  @ApiResponse({ status: 201, description: 'Reminder created successfully' })
  async create(@Body() createReminderDto: CreateReminderDto) {
    return await this.reminderService.create(createReminderDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all reminders' })
  @ApiResponse({
    status: 200,
    description: 'List of reminders returned successfully',
  })
  async findAll() {
    return await this.reminderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific reminder' })
  @ApiResponse({
    status: 200,
    description: 'Reminder found',
  })
  @ApiResponse({ status: 404, description: 'Reminder not found' })
  async findOne(@Param('id') id: string) {
    return await this.reminderService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a reminder' })
  @ApiResponse({ status: 204, description: 'Reminder removed successfully' })
  async delete(@Param('id') id: string) {
    await this.reminderService.delete(id);
  }
}
