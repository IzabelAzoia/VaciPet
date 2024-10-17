import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { CreatePetDto } from '../domain/pet/create-pet.dto';
import { PetService } from './pet.service';
import { UpdatePetDto } from '../domain/pet/update-pet.dto';
import { CreateVaccineReminderDto } from '../domain/vaccine-reminder/create-vaccine-reminder.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PetEntity } from '../domain/pet/pet.entity';
import { UploadService } from '../upload/upload.service';

@Controller('api/v1/pets')
export class PetController {
  constructor(
    private readonly petService: PetService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPet(
    @Body() createPetDto: CreatePetDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PetEntity> {
    const imageUrl = file
      ? await this.uploadService.uploadImageToStorage(file)
      : undefined;

    const newPet = await this.petService.create({
      ...createPetDto,
      imageUrl,
    });

    return newPet;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }

  @Get(':id/vaccines')
  getVaccinesForPet(@Param('id') id: string) {
    return this.petService.getVaccinesForPet(id);
  }

  @Get(':id/reminders')
  getRemindersForPet(@Param('id') id: string) {
    return this.petService.getRemindersForPet(id);
  }

  @Post(':id/vaccines/reminders')
  @HttpCode(HttpStatus.CREATED)
  createVaccineReminder(
    @Param('id') id: string,
    @Body() createVaccineReminderDto: CreateVaccineReminderDto,
  ) {
    return this.petService.createVaccineReminder(id, createVaccineReminderDto);
  }
}
