import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  Query,
} from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { Repository } from 'typeorm';
import { PerfilSolicitud } from 'src/perfil-solicitud/entities/perfil-solicitud.entity';

@Injectable()
export class SolicitudService {
  private logger = new Logger('solicitud');

  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,

    @InjectRepository(PerfilSolicitud)
    private readonly perfilSolicitudRepository: Repository<PerfilSolicitud>,
  ) {}

  async create(createSolicitudDto: CreateSolicitudDto) {
    try {
      const { requestProfiles = [], ...solicitudDetails } = createSolicitudDto;

      const solicitud = this.solicitudRepository.create({
        ...solicitudDetails,
        requestProfiles: requestProfiles.map((perfil) =>
          this.perfilSolicitudRepository.create({
            profile: perfil.profile,
            description: perfil.description,
            quantity: perfil.quantity,
            seniority: perfil.seniority,
            dc: perfil.dc,
          }),
        ),
      });
      await this.solicitudRepository.save(solicitud);

      return { ...solicitud, requestProfiles };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(@Query() paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const solicituds = await this.solicitudRepository.find({
      take: limit,
      skip: offset,
      relations: {
        requestProfiles: true,
      },
    });
    return solicituds;
  }

  async findOne(id: string) {
    return `This action returns a #${id} solicitud`;
  }

  async update(id: string, updateSolicitudDto: UpdateSolicitudDto) {
    return `This action updates a #${id} solicitud ${updateSolicitudDto}`;
  }

  async remove(id: string) {
    return `This action removes a #${id} solicitud`;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
