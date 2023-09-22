import { IsArray, IsString, IsUUID, MinLength } from 'class-validator';
// import { CreatePerfilSolicitudDto } from '../../../src/perfil-solicitud/dto/create-perfil-solicitud.dto';

export class CreateSolicitudDto {
  @IsUUID('4', { each: true })
  clientId: number | string;

  @IsString()
  @MinLength(1)
  proposalId: string;

  @IsString()
  tentativeDate: Date;

  @IsArray()
  requestProfiles: [];
}
