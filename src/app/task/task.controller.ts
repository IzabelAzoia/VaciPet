import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../domain/task/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body('name') name: string): Promise<Task> {
    return this.taskService.create(name);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('completed') completed: boolean,
  ): Promise<Task> {
    return this.taskService.update(id, completed);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }
  @Get(':id')
  async getTask(@Param('id') id: string): Promise<Task> {
    const task = await this.taskService.findOne(id);
    return task;
  }
}
