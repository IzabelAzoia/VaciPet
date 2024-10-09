import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VaccineEntity } from '../../../domain/vaccine/vaccine.entity';

@Injectable()
export class VaccineOrmRepository extends Repository<VaccineEntity> {}
