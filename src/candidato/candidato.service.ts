import { Injectable } from '@nestjs/common';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';

@Injectable()
export class CandidatoService {
  create(createCandidatoDto: CreateCandidatoDto) {
    return 'This action adds a new candidato';
  }

  findAll() {
    return `This action returns all candidato`;
  }

  findOne(id: string) {
    return `This action returns a #${id} candidato`;
  }

  update(id: string, updateCandidatoDto: UpdateCandidatoDto) {
    return `This action updates a #${id} candidato`;
  }

  remove(id: string) {
    return `This action removes a #${id} candidato`;
  }
}
