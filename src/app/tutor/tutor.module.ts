import { Module } from '@nestjs/common';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorEntity } from '../domain/tutor/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TutorEntity])],
  controllers: [TutorController],
  providers: [TutorService],
  exports: [TutorService],
})
export class TutorModule {}
