import { PetEntity } from '../domain/pet/pet.entity';
import { ReminderEntity } from '../domain/reminder/reminder.entity';
import { TutorEntity } from '../domain/tutor/tutor.entity';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql', // Switching to MySQL
  host: 'localhost',
  port: 3306, // Default for MySQL
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  synchronize: true, // Not recommended for production
  logging: false,
  entities: [PetEntity, TutorEntity, ReminderEntity, VaccineEntity],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
