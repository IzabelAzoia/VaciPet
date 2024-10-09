import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderEntity } from '../domain/reminder/reminder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReminderEntity])],
  controllers: [ReminderController],
  providers: [ReminderService],
  exports: [ReminderService],
})
export class ReminderModule {}
