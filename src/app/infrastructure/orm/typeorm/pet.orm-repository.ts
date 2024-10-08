@Injectable()
export class PetOrmRepository implements PetRepository {
  constructor(
    @InjectRepository(PetEntity) private petRepository: Repository<PetEntity>,
  ) {}

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async save(pet: Pet): Promise<Pet> {
    return this.petRepository.save(pet);
  }
}
