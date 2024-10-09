import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreatePetDto } from '../domain/pet/create-pet.dto';
import { PetService } from './pet.service';
import { UpdatePetDto } from '../domain/pet/update-pet.dto';

@Controller('api/v1/pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  // Fetch all pets
  @Get()
  findAll() {
    return this.petService.findAll();
  }

  // Create a new pet
  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  // Fetch a specific pet by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.findOne(id);
  }

  // Update an existing pet
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  // Delete a pet
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }

  // Fetch all vaccines associated with a pet
  @Get(':id/vaccines')
  getVaccinesForPet(@Param('id') id: string) {
    return this.petService.getVaccinesForPet(id);
  }

  // Fetch all reminders associated with a pet
  @Get(':id/reminders')
  getRemindersForPet(@Param('id') id: string) {
    return this.petService.getRemindersForPet(id);
  }
}
