import { Module } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoController } from './candidato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidato } from './entities/candidato.entity';
import { PerfilSolicitud } from 'src/perfil-solicitud/entities/perfil-solicitud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidato, PerfilSolicitud])],
  controllers: [CandidatoController],
  providers: [CandidatoService],
})
export class CandidatoModule {}
