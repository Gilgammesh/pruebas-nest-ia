import { IsString, IsUppercase, MinLength } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  @IsUppercase()
  sigla: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @MinLength(1)
  area: string;
}
