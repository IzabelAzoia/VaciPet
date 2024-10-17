import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineEntity } from '../domain/vaccine/vaccine.entity';
import { Repository } from 'typeorm';
import { CreateVaccineDto } from '../domain/vaccine/create-vaccine.dto';

@Injectable()
export class VaccineService {
  private readonly logger = new Logger(VaccineService.name);

  constructor(
    @InjectRepository(VaccineEntity)
    private readonly vaccineRepository: Repository<VaccineEntity>,
  ) {}

  async create(createVaccineDto: CreateVaccineDto): Promise<VaccineEntity> {
    try {
      const vaccine = this.vaccineRepository.create(createVaccineDto);
      return await this.vaccineRepository.save(vaccine);
    } catch (error: unknown) {
      this.logger.error(
        'Erro ao criar vacina',
        error instanceof Error ? error.stack : 'Erro desconhecido',
      );
      throw new Error('Erro ao criar vacina.');
    }
  }

  async update(
    id: string,
    updateVaccineDto: CreateVaccineDto,
  ): Promise<VaccineEntity> {
    try {
      await this.vaccineRepository.update(id, updateVaccineDto);
      return await this.findOneOrFail(id); // Usa o novo método aqui
    } catch (error: unknown) {
      this.logger.error(
        `Erro ao atualizar vacina com ID ${id}`,
        error instanceof Error ? error.stack : 'Erro desconhecido',
      );
      throw new Error(`Erro ao atualizar vacina com ID ${id}.`);
    }
  }

  async findAll(): Promise<VaccineEntity[]> {
    try {
      return await this.vaccineRepository.find();
    } catch (error: unknown) {
      this.logger.error(
        'Erro ao buscar vacinas',
        error instanceof Error ? error.stack : 'Erro desconhecido',
      );
      throw new Error('Erro ao buscar vacinas.');
    }
  }

  async findOneOrFail(id: string): Promise<VaccineEntity> {
    try {
      return await this.vaccineRepository.findOneOrFail({ where: { id } });
    } catch (error: unknown) {
      this.logger.error(
        `Vacina com ID ${id} não encontrada`,
        error instanceof Error ? error.stack : 'Erro desconhecido',
      );
      throw new NotFoundException(`Vacina com ID ${id} não encontrada.`);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.findOneOrFail(id); // Verifica se a vacina existe antes de tentar deletar
      await this.vaccineRepository.softDelete(id);
    } catch (error: unknown) {
      this.logger.error(
        `Erro ao deletar vacina com ID ${id}`,
        error instanceof Error ? error.stack : 'Erro desconhecido',
      );
      throw new Error(`Erro ao deletar vacina com ID ${id}.`);
    }
  }

  async getVacinasByPet(petId: string): Promise<VaccineEntity[]> {
    try {
      return await this.vaccineRepository.find({
        where: { pet: { id: petId } },
      });
    } catch (error: unknown) {
      this.logger.error(
        `Erro ao buscar vacinas para o pet com ID ${petId}`,
        error instanceof Error ? error.stack : 'Erro desconhecido',
      );
      throw new Error(`Erro ao buscar vacinas para o pet com ID ${petId}.`);
    }
  }
}
