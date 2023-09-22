import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { PerfilSolicitud } from 'src/perfil-solicitud/entities/perfil-solicitud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud, PerfilSolicitud])],
  controllers: [SolicitudController],
  providers: [SolicitudService],
})
export class SolicitudModule {}
