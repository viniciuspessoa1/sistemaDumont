import { IsString, IsEmail, IsIn } from 'class-validator';

export class CreateAlertExternalDto {
  @IsString()
  os!: string;

  @IsString()
  cliente!: string;

  @IsString()
  tipo!: string;

  @IsIn([
    'AGUARDANDO_AGENDAMENTO',
    'PECAS_PENDENTE',
    'PRAZO_ESTOURADO'
  ])
  mensagem!: string;

  @IsEmail()
  email!: string;

  @IsIn(['google_sheets'])
  origem!: 'google_sheets';
}