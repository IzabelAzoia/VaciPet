import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ReminderEntity } from '../../app/domain/reminder/reminder.entity';
import { ReminderService } from '../../app/reminder/reminder.service';
import { CreateReminderDto } from 'src/app/domain/reminder/create-reminder.dto';
import { TutorEntity } from 'src/app/domain/tutor/tutor.entity';

describe('ReminderService', () => {
  let service: ReminderService;
  let repository: Repository<ReminderEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReminderService,
        {
          provide: getRepositoryToken(ReminderEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReminderService>(ReminderService);
    repository = module.get<Repository<ReminderEntity>>(
      getRepositoryToken(ReminderEntity),
    );
  });

  it('should create a reminder', async () => {
    const createReminderDto: CreateReminderDto = {
      description: 'Reminder 1',
      reminderDate: new Date(),
      tutorId: 'tutor-123',
    };

    const savedReminder: ReminderEntity = {
      id: 'reminder-123',
      description: createReminderDto.description,
      reminderDate: createReminderDto.reminderDate,
      status: 'pending',
      tutor: { id: 'tutor-123' } as TutorEntity,
      vaccine: null, // ou um objeto correto se houver
      pet: null, // ou um objeto correto se houver
      createdAt: new Date(), // Preencha com a data correta ou um mock
      updatedAt: new Date(), // Preencha com a data correta ou um mock
    };

    jest.spyOn(repository, 'create').mockReturnValue(savedReminder);
    jest.spyOn(repository, 'save').mockResolvedValue(savedReminder);

    const result = await service.create(createReminderDto);
    expect(result).toEqual(savedReminder);
    expect(repository.create).toHaveBeenCalledWith({
      description: createReminderDto.description,
      reminderDate: createReminderDto.reminderDate,
      status: 'pending',
      tutor: { id: createReminderDto.tutorId },
    });
    expect(repository.save).toHaveBeenCalledWith(savedReminder);
  });
});
