import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreatePerfilSolicitudDto {
  @IsUUID('4', { each: true })
  profile: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsUUID('4', { each: true })
  seniority: string;

  @IsString()
  @MinLength(1)
  dc: string;
}
