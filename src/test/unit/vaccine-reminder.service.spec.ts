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

      // Criando um TutorEntity com parâmetros necessários
      const tutor = new TutorEntity(
        'Tutor Name', // name
        'tutor@example.com', // email
        '123456789', // phone
        'hashedpassword', // password
        [], // reminders
        [], // pets
      );

      // Criando um VaccineEntity com parâmetros necessários
      const vaccine = new VaccineEntity(
        'vaccine-id', // id
        'Flu Shot', // vaccineName
        firstDoseDate, // vaccineDate
        'pending', // applicationStatus
        new PetEntity( // pet (deve ser uma instância de PetEntity)
          'Buddy', // name
          'Dog', // type
          new Date('2020-01-01'), // birthDate
          'Labrador', // breed
          'image-url', // imageUrl
          tutor, // tutor (associando o tutor)
        ),
        [], // reminders
        new Date(), // createdAt
        new Date(), // updatedAt
      );

      // Criando uma instância de PetEntity (opcional, já está no VaccineEntity)
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
