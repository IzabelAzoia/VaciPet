import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../domain/task/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(name: string): Promise<Task> {
    const task = this.taskRepository.create({ name });
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error(`Task with id ${id} not found.`);
    }
    return task;
  }

  async update(id: string, completed: boolean): Promise<Task> {
    await this.taskRepository.update(id, { completed });
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
