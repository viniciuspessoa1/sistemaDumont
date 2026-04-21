import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  tipo!: string;

  @IsString()
  os!: string;

  @IsString()
  cliente!: string;

  @IsString()
  email!: string;

  @Type(() => Number)
  @IsNumber()
  timestamp!: number;
}