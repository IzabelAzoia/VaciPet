import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTutorDto } from '../domain/tutor/create-tutor.dto';
import { TutorEntity } from '../domain/tutor/tutor.entity';
import { TutorRepository } from '../domain/tutor/tutor.repository';

@Injectable()
export class TutorService {
  constructor(
    @InjectRepository(TutorRepository)
    private readonly tutorRepository: TutorRepository,
  ) {}

  async create(createTutorDto: CreateTutorDto): Promise<TutorEntity> {
    const tutor = this.tutorRepository.create(createTutorDto);
    return await this.tutorRepository.save(tutor);
  }

  async findAll(): Promise<TutorEntity[]> {
    return await this.tutorRepository.find();
  }

  async findOne(id: string): Promise<TutorEntity> {
    return await this.tutorRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.tutorRepository.delete(id);
  }
}
