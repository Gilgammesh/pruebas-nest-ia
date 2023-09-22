import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilSolicitudDto } from './create-perfil-solicitud.dto';

export class UpdatePerfilSolicitudDto extends PartialType(
  CreatePerfilSolicitudDto,
) {}
