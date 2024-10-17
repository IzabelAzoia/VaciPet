import { Repository } from 'typeorm';
import { ReminderEntity } from '../../app/domain/reminder/reminder.entity';
import { ReminderService } from '../../app/reminder/reminder.service';
import { TutorEntity } from '../../app/domain/tutor/tutor.entity';
import { VaccineEntity } from '../../app/domain/vaccine/vaccine.entity';
import { PetEntity } from '../../app/domain/pet/pet.entity';

describe('ReminderService', () => {
  let service: ReminderService;
  let repository: Repository<ReminderEntity>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<ReminderEntity>;
    service = new ReminderService(repository);
  });

  it('should create a reminder', async () => {
    const someTutorEntity: TutorEntity = {
      id: 'tutor-id',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      reminders: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'securepassword',
    };

    const createReminderDto = {
      description: 'Reminder for the vaccine',
      reminderDate: new Date(),
      tutorId: someTutorEntity.id,
      vaccineId: 'vaccine-id',
    };

    const somePetEntity: PetEntity = {
      id: 'pet-id',
      name: 'Buddy',
      type: 'Dog',
      birthDate: new Date('2020-01-01'),
      breed: 'Labrador',
      vaccines: [],
      reminders: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const someVaccineEntity: VaccineEntity = {
      id: 'vaccine-id',
      vaccineName: 'Rabies',
      vaccineDate: new Date(),
      applicationStatus: 'Not Applied',
      pet: somePetEntity,
      reminders: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const reminderCreated: ReminderEntity = {
      id: 'reminder-id',
      reminderDate: createReminderDto.reminderDate,
      status: 'pending',
      description: createReminderDto.description,
      tutor: someTutorEntity,
      vaccine: someVaccineEntity,
      pet: somePetEntity,
      createdAt: new Date(),
      updatedAt: new Date(),
      vaccineName: someVaccineEntity.vaccineName,
      vaccineDate: someVaccineEntity.vaccineDate,
      applicationStatus: someVaccineEntity.applicationStatus,
    };

    jest.spyOn(repository, 'create').mockReturnValue(reminderCreated);
    jest.spyOn(repository, 'save').mockResolvedValue(reminderCreated);

    const result = await service.create(createReminderDto);

    expect(result).toEqual(reminderCreated);

    expect(repository.create).toHaveBeenCalledWith({
      description: createReminderDto.description,
      reminderDate: createReminderDto.reminderDate,
      status: 'pending',
      tutor: { id: createReminderDto.tutorId },
      vaccine: someVaccineEntity,
      pet: somePetEntity,
      vaccineName: someVaccineEntity.vaccineName,
      vaccineDate: someVaccineEntity.vaccineDate,
      applicationStatus: someVaccineEntity.applicationStatus,
    });

    expect(repository.save).toHaveBeenCalledWith(reminderCreated);
  });
});
