import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from '../domain/pet/create-pet.dto';
import { PetEntity } from '../domain/pet/pet.entity';
import { UpdatePetDto } from '../domain/pet/update-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>, // Repository injection
  ) {}

  async findAll(): Promise<PetEntity[]> {
    return await this.petRepository.find(); // Returns all pets from the database
  }

  async create(createPetDto: CreatePetDto): Promise<PetEntity> {
    const newPet = this.petRepository.create(createPetDto); // Creates a Pet instance
    return await this.petRepository.save(newPet); // Saves to the database
  }

  async findOne(id: string): Promise<PetEntity> {
    const pet = await this.petRepository.findOne({ where: { id } });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<PetEntity> {
    const pet = await this.petRepository.preload({
      id,
      ...updatePetDto,
    });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return await this.petRepository.save(pet);
  }

  async remove(id: string): Promise<PetEntity> {
    const pet = await this.findOne(id);
    return await this.petRepository.remove(pet); // Removes the pet from the database
  }

  // Get vaccines associated with the pet
  async getVaccinesForPet(id: string) {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['vaccines'], // Relationship with VaccineEntity
    });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet.vaccines;
  }

  // Get reminders associated with the pet
  async getRemindersForPet(id: string) {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['reminders'], // Relationship with ReminderEntity
    });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet.reminders;
  }
}
