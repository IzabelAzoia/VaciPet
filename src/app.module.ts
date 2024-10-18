import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VaccineModule } from './app/vaccine/vaccine.module';
import { PetModule } from './app/pet/pet.module';
import { ReminderModule } from './app/reminder/reminder.module';
import { TutorModule } from './app/tutor/tutor.module';
import { VaccineReminderModule } from './app/vaccine-reminder/vaccine-reminder.module';
import { Task } from './app/domain/task/task.entity';
import { TaskController } from './app/task/task.controller';
import { TaskService } from './app/task/task.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', '44.197.222.103'),
        port: Number(configService.get('DB_PORT', 3000)),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'rootpassword'),
        database: configService.get('DB_DATABASE', 'todo'),
        entities: [Task],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Task]),
    PetModule,
    ReminderModule,
    TutorModule,
    VaccineModule,
    VaccineReminderModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
