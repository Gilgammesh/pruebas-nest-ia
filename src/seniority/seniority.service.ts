import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateSeniorityDto } from './dto/create-seniority.dto';
import { UpdateSeniorityDto } from './dto/update-seniority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seniority } from './entities/seniority.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class SeniorityService {
  // para ver los log de un aforma mas amigable
  private logger = new Logger('SeniorityService');

  constructor(
    @InjectRepository(Seniority)
    private readonly seniorityRepository: Repository<Seniority>,
  ) {}

  async create(createSeniorityDto: CreateSeniorityDto) {
    try {
      await this.seniorityRepository.save(createSeniorityDto);
    } catch (error) {
      this.handleDBException(error);
    }
    return createSeniorityDto;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset = 0 } = paginationDto;

    const senioritys = await this.seniorityRepository.find({
      take: limit,
      skip: offset,
    });
    return senioritys;
  }
  Ç;

  async findOne(id: string) {
    const seniority = await this.seniorityRepository.findOneBy({ id });
    return seniority;
  }

  async update(id: string, updateSeniorityDto: UpdateSeniorityDto) {
    const seniority = await this.seniorityRepository.preload({
      id,
      ...updateSeniorityDto,
    });

    try {
      await this.seniorityRepository.save(seniority);
    } catch (error) {
      this.handleDBException(error);
    }
    return seniority;
  }

  async remove(id: string) {
    const seniority = await this.findOne(id);
    try {
      await this.seniorityRepository.remove(seniority);
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
