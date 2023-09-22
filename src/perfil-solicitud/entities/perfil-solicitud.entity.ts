import { Candidato } from 'src/candidato/entities/candidato.entity';
import { Solicitud } from 'src/solicitud/entities/solicitud.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'perfiles_solicitudes' })
export class PerfilSolicitud {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  profile: string;

  @Column('text')
  description: string;

  @Column('int', {
    default: 0,
  })
  quantity: number;

  @Column('uuid')
  seniority: string;

  @Column('text')
  dc: string;

  // Relacion con solicitudes
  @ManyToOne(() => Solicitud, (solicitud) => solicitud.requestProfiles, {
    onDelete: 'CASCADE',
  })
  solicitud: Solicitud;

  // relacion con la tabla canditaos
  @OneToMany(() => Candidato, (candidato) => candidato.perfil, {
    cascade: true,
    eager: true,
  })
  requestCandidatos: Candidato;
}
