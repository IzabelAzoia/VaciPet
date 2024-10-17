import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PetEntity } from '../../app/domain/pet/pet.entity';
import { Repository } from 'typeorm';
import { PetService } from '../../app/pet/pet.service';
import { ReminderEntity } from '../../app/domain/reminder/reminder.entity';
import { CreateVaccineReminderDto } from '../../app/domain/vaccine-reminder/create-vaccine-reminder.dto';
import { TutorEntity } from '../../app/domain/tutor/tutor.entity';
import { VaccineEntity } from '../../app/domain/vaccine/vaccine.entity';

describe('PetService', () => {
  let service: PetService;
  let petRepository: Repository<PetEntity>;
  let reminderRepository: Repository<ReminderEntity>;

  const mockTutor: TutorEntity = {
    id: 'some-tutor-id',
    email: 'tutor@example.com',
    password: 'hashedpassword',
    name: 'Tutor Name',
    phone: '123456789',
    reminders: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPet: PetEntity = {
    id: 'some-uuid',
    name: 'Buddy',
    type: 'Dog',
    breed: 'Labrador',
    birthDate: new Date('2020-01-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    reminders: [],
    vaccines: [],
  };

  const mockVaccine: VaccineEntity = {
    id: 'some-vaccine-id',
    vaccineName: 'Vaccine Name',
    vaccineDate: new Date(),
    applicationStatus: 'Not Applied',
    pet: mockPet,
    reminders: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetService,
        {
          provide: getRepositoryToken(PetEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ReminderEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PetService>(PetService);
    petRepository = module.get<Repository<PetEntity>>(
      getRepositoryToken(PetEntity),
    );
    reminderRepository = module.get<Repository<ReminderEntity>>(
      getRepositoryToken(ReminderEntity),
    );
  });

  it('should create a vaccine reminder', async () => {
    const petId = 'some-pet-id';

    const pet = new PetEntity(
      'Buddy',
      'Dog',
      new Date('2020-01-01'),
      'Labrador',
    );

    const createVaccineReminderDto: CreateVaccineReminderDto = {
      reminderDate: new Date(),
      description: 'Vaccine Reminder',
      status: 'pending',
      vaccineName: 'Rabies',
      vaccineDate: new Date(),
      applicationStatus: 'scheduled',
    };

    jest.spyOn(petRepository, 'findOne').mockResolvedValue(pet);
    jest.spyOn(reminderRepository, 'save').mockResolvedValue({
      id: 'some-reminder-id',
      tutor: mockTutor,
      vaccine: mockVaccine,
      createdAt: new Date(),
      updatedAt: new Date(),
      reminderDate: createVaccineReminderDto.reminderDate,
      description: createVaccineReminderDto.description,
      status: createVaccineReminderDto.status,
      pet: pet,
      vaccineName: createVaccineReminderDto.vaccineName,
      vaccineDate: createVaccineReminderDto.vaccineDate,
      applicationStatus: createVaccineReminderDto.applicationStatus,
    } as ReminderEntity);

    const result = await service.createVaccineReminder(
      petId,
      createVaccineReminderDto,
    );

    expect(reminderRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        reminderDate: createVaccineReminderDto.reminderDate,
        description: createVaccineReminderDto.description,
        status: createVaccineReminderDto.status,
        pet: expect.objectContaining({ id: petId }),
        vaccineName: createVaccineReminderDto.vaccineName,
        vaccineDate: createVaccineReminderDto.vaccineDate,
        applicationStatus: createVaccineReminderDto.applicationStatus,
      }),
    );

    expect(result).toEqual(
      expect.objectContaining({
        id: 'some-reminder-id',
        reminderDate: createVaccineReminderDto.reminderDate,
        description: createVaccineReminderDto.description,
        status: createVaccineReminderDto.status,
        pet,
        vaccineName: createVaccineReminderDto.vaccineName,
        vaccineDate: createVaccineReminderDto.vaccineDate,
        applicationStatus: createVaccineReminderDto.applicationStatus,
      }),
    );
  });
});
