import { Test, TestingModule } from '@nestjs/testing';
import { VaccineService } from '../../app/vaccine/vaccine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VaccineEntity } from '../../app/domain/vaccine/vaccine.entity';
import { Repository } from 'typeorm';

describe('VaccineService', () => {
  let service: VaccineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VaccineService,
        {
          provide: getRepositoryToken(VaccineEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VaccineService>(VaccineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
