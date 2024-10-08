@Injectable()
export class PetService {
  constructor(private readonly petRepository: PetRepository) {}

  findAll(): Promise<Pet[]> {
    return this.petRepository.findAll();
  }

  create(createPetDto: CreatePetDto): Promise<Pet> {
    const pet = new Pet(createPetDto.name, createPetDto.breed);
    return this.petRepository.save(pet);
  }
}
