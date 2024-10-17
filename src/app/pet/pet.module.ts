import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from '../domain/pet/pet.entity';
import { ReminderEntity } from '../domain/reminder/reminder.entity';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PetEntity, VaccineEntity, ReminderEntity]),
  ],
  controllers: [PetController],
  providers: [PetService, UploadService],
  exports: [PetService, UploadService],
})
export class PetModule {}
