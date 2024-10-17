import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from '../domain/pet/create-pet.dto';
import { PetEntity } from '../domain/pet/pet.entity';
import { UpdatePetDto } from '../domain/pet/update-pet.dto';
import { ReminderEntity } from '../domain/reminder/reminder.entity';
import { CreateVaccineReminderDto } from '../domain/vaccine-reminder/create-vaccine-reminder.dto';
import { VaccineReminderEntity } from '../domain/vaccine-reminder/vaccine-reminder.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,

    @InjectRepository(ReminderEntity)
    private readonly reminderRepository: Repository<ReminderEntity>,
  ) {}

  async findAll(): Promise<PetEntity[]> {
    return await this.petRepository.find();
  }

  async create(createPetDto: CreatePetDto): Promise<PetEntity> {
    const newPet = this.petRepository.create(createPetDto);
    return await this.petRepository.save(newPet);
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
    return await this.petRepository.remove(pet);
  }

  async getVaccinesForPet(id: string) {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['vaccines'],
    });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet.vaccines;
  }

  async getRemindersForPet(id: string) {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['reminders'],
    });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet.reminders;
  }

  async createVaccineReminder(
    petId: string,
    createVaccineReminderDto: CreateVaccineReminderDto,
  ): Promise<ReminderEntity> {
    const pet = await this.petRepository.findOne({
      where: { id: petId },
      relations: ['tutor'],
    });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    const vaccineReminder = new VaccineReminderEntity(
      createVaccineReminderDto.doses,
      new Date(createVaccineReminderDto.firstDoseDate),
      createVaccineReminderDto.name,
      new Date(createVaccineReminderDto.reminderDate),
      createVaccineReminderDto.status,
      createVaccineReminderDto.description,
      createVaccineReminderDto.vaccineName,
      new Date(createVaccineReminderDto.vaccineDate),
      createVaccineReminderDto.applicationStatus,
      pet.tutor,
      createVaccineReminderDto.vaccine,
      pet,
      createVaccineReminderDto.intervalBetweenDoses,
    );

    vaccineReminder.reminderDate = new Date(
      createVaccineReminderDto.reminderDate,
    );
    vaccineReminder.description = createVaccineReminderDto.description;
    vaccineReminder.status = createVaccineReminderDto.status;

    vaccineReminder.vaccineName = createVaccineReminderDto.vaccineName;
    vaccineReminder.vaccineDate = new Date(
      createVaccineReminderDto.vaccineDate,
    );
    vaccineReminder.applicationStatus =
      createVaccineReminderDto.applicationStatus;

    vaccineReminder.pet = pet;

    return await this.reminderRepository.save(vaccineReminder);
  }
}
