import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PetEntity } from '../../../domain/pet/pet.entity';

@Injectable()
export class PetOrmRepository extends Repository<PetEntity> {}
