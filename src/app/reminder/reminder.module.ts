import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderEntity } from '../domain/reminder/reminder.entity';
import { PetModule } from '../pet/pet.module';
import { VaccineModule } from '../vaccine/vaccine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReminderEntity]),
    PetModule, // Importando o módulo que contém PetService
    VaccineModule, // Importando o módulo que contém VaccineService
  ],
  controllers: [ReminderController],
  providers: [ReminderService],
  exports: [ReminderService],
})
export class ReminderModule {}
