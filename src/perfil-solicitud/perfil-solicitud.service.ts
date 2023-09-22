import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreatePerfilSolicitudDto } from './dto/create-perfil-solicitud.dto';
import { UpdatePerfilSolicitudDto } from './dto/update-perfil-solicitud.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilSolicitud } from './entities/perfil-solicitud.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PerfilSolicitudService {
  private logger = new Logger('perfilSolicitud');

  constructor(
    @InjectRepository(PerfilSolicitud)
    private readonly perfilSolicitudRepository: Repository<PerfilSolicitud>,
  ) {}

  async create(createPerfilSolicitudDto: CreatePerfilSolicitudDto) {
    try {
      await this.perfilSolicitudRepository.save(createPerfilSolicitudDto);
    } catch (error) {
      this.handleDBException(error);
    }
    return createPerfilSolicitudDto;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset = 0 } = paginationDto;

    const perfilSolicitudes = await this.perfilSolicitudRepository.find({
      take: limit,
      skip: offset,
    });

    return perfilSolicitudes;
  }

  async findOne(id: string) {
    const perfilSolicitud = await this.perfilSolicitudRepository.findOneBy({
      id,
    });
    return perfilSolicitud;
  }

  async update(id: string, updatePerfilSolicitudDto: UpdatePerfilSolicitudDto) {
    const perfilSolicitud = await this.perfilSolicitudRepository.preload({
      id,
      ...updatePerfilSolicitudDto,
    });

    try {
      this.perfilSolicitudRepository.save(perfilSolicitud);
    } catch (error) {
      this.handleDBException(error);
    }
    return perfilSolicitud;
  }

  async remove(id: string) {
    const perfilSolicitud = await this.findOne(id);
    try {
      this.perfilSolicitudRepository.remove(perfilSolicitud);
    } catch (error) {
      this.handleDBException(error);
    }
    return perfilSolicitud;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
