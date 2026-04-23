import { IsString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  tipo!: string;

  @IsString()
  os!: string;

  @IsString()
  cliente!: string;

  @IsString()
  mensagem!: string;

  @IsString()
  origem!: string;

  @IsOptional()
  @IsString()
  email?: string;
}