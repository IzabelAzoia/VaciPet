export interface PetRepository {
  findAll(): Promise<Pet[]>;
  save(pet: Pet): Promise<Pet>;
}
