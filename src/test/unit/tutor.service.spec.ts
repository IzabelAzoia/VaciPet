import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from '../../app/domain/pet/pet.entity';
import { PetService } from '../../app/pet/pet.service';
import { ReminderEntity } from '../../app/domain/reminder/reminder.entity';

describe('PetService', () => {
  let service: PetService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
