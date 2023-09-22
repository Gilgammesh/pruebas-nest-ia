import { Module } from '@nestjs/common';
import { PerfilSolicitudService } from './perfil-solicitud.service';
import { PerfilSolicitudController } from './perfil-solicitud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilSolicitud } from './entities/perfil-solicitud.entity';
import { Solicitud } from 'src/solicitud/entities/solicitud.entity';
import { Candidato } from 'src/candidato/entities/candidato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilSolicitud, Solicitud, Candidato])],
  controllers: [PerfilSolicitudController],
  providers: [PerfilSolicitudService],
  exports: [PerfilSolicitudService, TypeOrmModule],
})
export class PerfilSolicitudModule {}
