import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PetEntity } from './pet.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'vacinas' })
export class VaccineEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty({ description: 'Nome da vacina' })
  nomeVacina: string;

  @Column()
  @ApiProperty({ description: 'Data prevista para a aplicação' })
  dataVacina: string;

  @Column()
  @ApiProperty({ description: 'Status da vacina: Aplicada ou Não Aplicada' })
  statusAplicacao: string;

  @ManyToOne(() => PetEntity, (pet) => pet.vacinas)
  @ApiProperty({ description: 'Pet que receberá a vacina' })
  pet: PetEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  deletedAt: Date;
}
