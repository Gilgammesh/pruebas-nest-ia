import { PerfilSolicitud } from 'src/perfil-solicitud/entities/perfil-solicitud.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'candidatos' })
export class Candidato {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  cv: string;

  @Column('int', {
    default: 0,
  })
  ranking: number;

  @ManyToOne(
    () => PerfilSolicitud,
    (perfilSolicitud) => perfilSolicitud.requestCandidatos,
    {
      onDelete: 'CASCADE',
    },
  )
  perfil: PerfilSolicitud;
}
