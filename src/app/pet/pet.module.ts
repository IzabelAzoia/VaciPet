import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from '../domain/pet/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
