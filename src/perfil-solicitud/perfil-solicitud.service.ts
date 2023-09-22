import { Injectable } from '@nestjs/common';
import { CreatePerfilSolicitudDto } from './dto/create-perfil-solicitud.dto';
import { UpdatePerfilSolicitudDto } from './dto/update-perfil-solicitud.dto';

@Injectable()
export class PerfilSolicitudService {
  create(createPerfilSolicitudDto: CreatePerfilSolicitudDto) {
    return 'This action adds a new perfilSolicitud';
  }

  findAll() {
    return `This action returns all perfilSolicitud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perfilSolicitud`;
  }

  update(id: number, updatePerfilSolicitudDto: UpdatePerfilSolicitudDto) {
    return `This action updates a #${id} perfilSolicitud`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfilSolicitud`;
  }
}
