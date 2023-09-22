import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'senioritys' })
export class Seniority {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;
}
