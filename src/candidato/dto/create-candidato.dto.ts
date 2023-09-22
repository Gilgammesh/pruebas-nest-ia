import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCandidatoDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  cv: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  ranking?: number;
}
