import { Module } from '@nestjs/common';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';
import { VaccineRepository } from '../domain/vaccine/vaccine.repository';
import { VaccineReminderService } from '../vaccine-reminder/vaccine-reminder.service';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineEntity, VaccineRepository])],
  controllers: [VaccineController],
  providers: [VaccineService, VaccineReminderService],
  exports: [VaccineService, VaccineReminderService],
})
export class VaccineModule {}
