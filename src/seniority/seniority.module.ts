import { Module } from '@nestjs/common';
import { SeniorityService } from './seniority.service';
import { SeniorityController } from './seniority.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seniority } from './entities/seniority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seniority])],
  controllers: [SeniorityController],
  providers: [SeniorityService],
})
export class SeniorityModule {}
