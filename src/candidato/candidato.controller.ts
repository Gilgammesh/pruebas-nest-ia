import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('candidato')
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @Post()
  create(@Body() createCandidatoDto: CreateCandidatoDto) {
    return this.candidatoService.create(createCandidatoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.candidatoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.candidatoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCandidatoDto: UpdateCandidatoDto,
  ) {
    return this.candidatoService.update(id, updateCandidatoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.candidatoService.remove(id);
  }
}
