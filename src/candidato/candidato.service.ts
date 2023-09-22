import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidato } from './entities/candidato.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CandidatoService {
  // para ver los log de un aforma mas amigable
  private logger = new Logger('Candidato');

  constructor(
    @InjectRepository(Candidato)
    private readonly candidatoRepository: Repository<Candidato>,
  ) {}

  async create(createCandidatoDto: CreateCandidatoDto) {
    try {
      await this.candidatoRepository.save(createCandidatoDto);
    } catch (error) {
      this.handleDBException(error);
    }
    return createCandidatoDto;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset = 0 } = paginationDto;

    const candidatos = await this.candidatoRepository.find({
      take: limit,
      skip: offset,
    });

    return candidatos;
  }

  async findOne(id: string) {
    const candidato = await this.candidatoRepository.findOneBy({ id });
    return candidato;
  }

  async update(id: string, updateCandidatoDto: UpdateCandidatoDto) {
    const candidato = await this.candidatoRepository.preload({
      id,
      ...updateCandidatoDto,
    });

    try {
      this.candidatoRepository.save(candidato);
    } catch (error) {
      this.handleDBException(error);
    }
    return candidato;
  }

  async remove(id: string) {
    const candidato = await this.findOne(id);
    try {
      this.candidatoRepository.remove(candidato);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
