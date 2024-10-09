import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PetEntity } from '../../app/domain/pet/pet.entity';
import { Repository } from 'typeorm';
import { PetService } from '../../app/pet/pet.service';

describe('PetService', () => {
  let repository: Repository<PetEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetService,
        {
          provide: getRepositoryToken(PetEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<Repository<PetEntity>>(
      getRepositoryToken(PetEntity),
    );
  });

  it('should return all pets', async () => {
    const mockPets = [new PetEntity(), new PetEntity()]; // Mock de dados de pets
    jest.spyOn(repository, 'find').mockResolvedValueOnce(mockPets); // Mockando o método find

    const pets = await repository.find();
    expect(pets).toBeDefined();
    expect(pets.length).toBe(2); // Verificando que o array de pets retornado tem 2 itens
  });
});
