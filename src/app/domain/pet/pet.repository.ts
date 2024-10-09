import { Repository } from 'typeorm';
import { PetEntity } from './pet.entity';

export class PetRepository extends Repository<PetEntity> {}
