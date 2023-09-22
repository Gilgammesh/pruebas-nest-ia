import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('solicitud')
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) {}

  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudService.create(createSolicitudDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.solicitudService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseArrayPipe) id: string) {
    return this.solicitudService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseArrayPipe) id: string,
    @Body() updateSolicitudDto: UpdateSolicitudDto,
  ) {
    return this.solicitudService.update(id, updateSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseArrayPipe) id: string) {
    return this.solicitudService.remove(id);
  }
}
