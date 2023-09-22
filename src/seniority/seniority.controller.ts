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
import { SeniorityService } from './seniority.service';
import { CreateSeniorityDto } from './dto/create-seniority.dto';
import { UpdateSeniorityDto } from './dto/update-seniority.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('seniority')
export class SeniorityController {
  constructor(private readonly seniorityService: SeniorityService) {}

  @Post()
  create(@Body() createSeniorityDto: CreateSeniorityDto) {
    return this.seniorityService.create(createSeniorityDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.seniorityService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.seniorityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSeniorityDto: UpdateSeniorityDto,
  ) {
    return this.seniorityService.update(id, updateSeniorityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.seniorityService.remove(id);
  }
}
