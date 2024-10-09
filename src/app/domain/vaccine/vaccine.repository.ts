import { Repository } from 'typeorm';
import { VaccineEntity } from './vaccine.entity';

export class VaccineRepository extends Repository<VaccineEntity> {}
