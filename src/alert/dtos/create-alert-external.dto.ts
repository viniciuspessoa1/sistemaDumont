export class CreateAlertExternalDto {
  os!: string;
  cliente!: string;
  tipo!: string;
  mensagem!: string;
  email!: string;
  origem!: 'google_sheets';
}