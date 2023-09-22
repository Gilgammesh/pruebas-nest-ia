import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilModule } from './perfil/perfil.module';
import { CommonModule } from './common/common.module';
import { SeniorityModule } from './seniority/seniority.module';
import { CandidatoModule } from './candidato/candidato.module';
import { PerfilSolicitudModule } from './perfil-solicitud/perfil-solicitud.module';
import { SolicitudModule } from './solicitud/solicitud.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PerfilModule,
    CommonModule,
    SeniorityModule,
    CandidatoModule,
    PerfilSolicitudModule,
    SolicitudModule,
  ],
  controllers: [],
  providers: [],
  // exports: [TypeOrmModule],
})
export class AppModule {}
