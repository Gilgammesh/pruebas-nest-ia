import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PerfilSolicitudService } from './perfil-solicitud.service';
import { CreatePerfilSolicitudDto } from './dto/create-perfil-solicitud.dto';
import { UpdatePerfilSolicitudDto } from './dto/update-perfil-solicitud.dto';

@Controller('perfil-solicitud')
export class PerfilSolicitudController {
  constructor(
    private readonly perfilSolicitudService: PerfilSolicitudService,
  ) {}

  @Post()
  create(@Body() createPerfilSolicitudDto: CreatePerfilSolicitudDto) {
    return this.perfilSolicitudService.create(createPerfilSolicitudDto);
  }

  @Get()
  findAll() {
    return this.perfilSolicitudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilSolicitudService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerfilSolicitudDto: UpdatePerfilSolicitudDto,
  ) {
    return this.perfilSolicitudService.update(+id, updatePerfilSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfilSolicitudService.remove(+id);
  }
}
