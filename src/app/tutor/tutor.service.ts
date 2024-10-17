import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTutorDto } from '../domain/tutor/create-tutor.dto';
import { TutorEntity } from '../domain/tutor/tutor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TutorService {
  constructor(
    @InjectRepository(TutorEntity)
    private readonly tutorRepository: Repository<TutorEntity>,
  ) {}

  async create(createTutorDto: CreateTutorDto): Promise<TutorEntity> {
    const tutor = this.tutorRepository.create(createTutorDto);
    return await this.tutorRepository.save(tutor);
  }

  async findAll(): Promise<TutorEntity[]> {
    return await this.tutorRepository.find();
  }

  async findOne(id: string): Promise<TutorEntity> {
    const tutor = await this.tutorRepository.findOne({ where: { id } });

    if (!tutor) {
      throw new NotFoundException(`Tutor with ID ${id} not found.`);
    }

    return tutor;
  }

  async findByEmail(email: string): Promise<TutorEntity | null> {
    return await this.tutorRepository.findOne({ where: { email } });
  }

  async delete(id: string): Promise<void> {
    await this.tutorRepository.delete(id);
  }
}
