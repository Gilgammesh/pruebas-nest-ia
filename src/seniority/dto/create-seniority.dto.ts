import { IsString, MinLength } from 'class-validator';

export class CreateSeniorityDto {
  @IsString()
  @MinLength(1)
  name: string;
}
