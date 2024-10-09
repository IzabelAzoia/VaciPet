import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';
import { Repository } from 'typeorm';
import { CreateVaccineDto } from '../domain/vaccine/vaccine.dto';

@Injectable()
@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(VaccineEntity)
    private vaccineRepository: Repository<VaccineEntity>,
  ) {}

  // Criar uma nova vacina
  async create(createVaccineDto: CreateVaccineDto) {
    const vaccine = this.vaccineRepository.create(createVaccineDto);
    return await this.vaccineRepository.save(vaccine);
  }

  // Atualizar uma vacina existente
  async update(id: string, updateVaccineDto: CreateVaccineDto) {
    await this.vaccineRepository.update(id, updateVaccineDto);
    return this.vaccineRepository.findOne({ where: { id } }); // Retorna a vacina atualizada
  }

  // Buscar todas as vacinas
  async findAll() {
    return await this.vaccineRepository.find();
  }

  // Buscar uma vacina específica pelo ID
  async findOneOrFail(id: string) {
    try {
      return await this.vaccineRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Vacina com ID ${id} não encontrada.`);
    }
  }

  // Remover uma vacina
  async deleteById(id: string) {
    await this.findOneOrFail(id); // Garante que a vacina existe antes de deletar
    await this.vaccineRepository.softDelete(id);
  }

  async getVacinasByPet(petId: string) {
    return await this.vaccineRepository.find({
      where: { pet: { id: petId } }, // Usando um objeto para referenciar o PetEntity
    });
  }
}
