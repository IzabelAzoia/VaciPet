import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineReminderService } from './vaccine-reminder.service';
import { VaccineReminderController } from './vaccine-reminder.controller';
import { VaccineReminderEntity } from '../domain/vaccine-reminder/vaccine-reminder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineReminderEntity])],
  controllers: [VaccineReminderController],
  providers: [VaccineReminderService],
  exports: [VaccineReminderService],
})
export class VaccineReminderModule {}
