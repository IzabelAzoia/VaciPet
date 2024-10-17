import { PetEntity } from '../app/domain/pet/pet.entity';
import { ReminderEntity } from '../app/domain/reminder/reminder.entity';
import { TutorEntity } from '../app/domain/tutor/tutor.entity';
import { VaccineReminderEntity } from '../app/domain/vaccine-reminder/vaccine-reminder.entity';
import { VaccineEntity } from '../app/domain/vaccine/vaccine.entity';
import { DataSource } from 'typeorm';

const AppDataSourceDev = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [
    PetEntity,
    TutorEntity,
    ReminderEntity,
    VaccineEntity,
    VaccineReminderEntity,
  ],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/migration/**/*.js']
      : ['src/migration/**/*.ts'],
  subscribers: [],
});

export default AppDataSourceDev;
