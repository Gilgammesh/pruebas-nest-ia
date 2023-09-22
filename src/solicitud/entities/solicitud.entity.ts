import { PerfilSolicitud } from 'src/perfil-solicitud/entities/perfil-solicitud.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'solicitudes' })
export class Solicitud {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  clientId: string;

  @Column('text')
  proposalId: string;

  @Column('text')
  tentativeDate: string;

  // relacion con la tabla perfil-solicitud
  @OneToMany(
    () => PerfilSolicitud,
    (perfilSolicitud) => perfilSolicitud.solicitud,
    {
      cascade: true,
      eager: true,
    },
  )
  requestProfiles: PerfilSolicitud;
}
