import { Module } from '@nestjs/common';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineEntity])],
  controllers: [VaccineController],
  providers: [VaccineService],
  exports: [VaccineService],
})
export class TodoModule {}
