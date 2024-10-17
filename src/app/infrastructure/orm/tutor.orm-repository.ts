import { Repository } from 'typeorm';
import { TutorEntity } from '../../domain/tutor/tutor.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TutorOrmRepository extends Repository<TutorEntity> {}
