import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PerfilService {
  // para ver los log de un aforma mas amigable
  private logger = new Logger('PerfilService');

  constructor(
    @InjectRepository(Perfil)
    private readonly perfilRepository: Repository<Perfil>,
  ) {}

  async create(createPerfilDto: CreatePerfilDto) {
    try {
      await this.perfilRepository.save(createPerfilDto);
    } catch (error) {
      this.handleDBException(error);
    }
    return createPerfilDto;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset = 0 } = paginationDto;

    const perfiles = await this.perfilRepository.find({
      take: limit,
      skip: offset,
    });
    return perfiles;
  }

  async findOne(id: string) {
    const perfil = await this.perfilRepository.findOneBy({ id });
    return perfil;
  }

  async update(id: string, updatePerfilDto: UpdatePerfilDto) {
    const perfil = await this.perfilRepository.preload({
      id,
      ...updatePerfilDto,
    });
    try {
      await this.perfilRepository.save(perfil);
    } catch (error) {
      this.handleDBException(error);
    }

    return perfil;
  }

  async remove(id: string) {
    const perfil = await this.findOne(id);
    await this.perfilRepository.remove(perfil);
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
