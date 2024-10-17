import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;

  constructor(id: string, name: string, completed: boolean = false) {
    this.id = id;
    this.name = name;
    this.completed = completed;
  }
}
