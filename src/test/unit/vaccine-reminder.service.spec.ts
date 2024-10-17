import { Test, TestingModule } from '@nestjs/testing';
import { PetEntity } from '../../app/domain/pet/pet.entity';
import { TutorEntity } from '../../app/domain/tutor/tutor.entity';
import { VaccineEntity } from '../../app/domain/vaccine/vaccine.entity';
import { VaccineReminderService } from '../../app/vaccine-reminder/vaccine-reminder.service';

describe('VaccineReminderService', () => {
  let service: VaccineReminderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccineReminderService],
    }).compile();

    service = module.get<VaccineReminderService>(VaccineReminderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReminder', () => {
    it('should create a vaccine reminder', async () => {
      const firstDoseDate = new Date();
      const reminderDate = new Date();

      const tutor = new TutorEntity(
        'Tutor Name',
        'tutor@example.com',
        '123456789',
        'hashedpassword',
        [],
        [],
      );

      const vaccine = new VaccineEntity(
        'vaccine-id',
        'Flu Shot',
        firstDoseDate,
        'pending',
        new PetEntity(
          'Buddy',
          'Dog',
          new Date('2020-01-01'),
          'Labrador',
          'image-url',
          tutor,
        ),
        [],
        new Date(),
        new Date(),
      );

      const pet = new PetEntity(
        'Buddy',
        'Dog',
        new Date('2020-01-01'),
        'Labrador',
        'image-url',
        tutor,
      );

      const result = await service.createReminder(
        'Flu Shot',
        2,
        firstDoseDate,
        reminderDate,
        tutor,
        'pending',
        vaccine,
        pet,
        30,
      );

      expect(result.vaccineReminder.description).toBe('Flu Shot');
      expect(result.vaccineReminder.doses).toBe(2);
      expect(result.vaccineReminder.firstDoseDate).toEqual(firstDoseDate);
    });
  });
});
