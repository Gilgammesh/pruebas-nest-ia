import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity({ name: 'perfiles' })
export class Perfil {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  sigla: string;

  @Column('text')
  description: string;

  @Column('text')
  area: string;

  @BeforeInsert()
  checkSlugInsert() {
    this.sigla = this.sigla.toUpperCase();
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.sigla = this.sigla.toUpperCase();
  }
}
