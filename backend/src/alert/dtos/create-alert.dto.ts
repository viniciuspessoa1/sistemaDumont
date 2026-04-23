import { IsString } from "class-validator";

export class CreateAlertDto {
    @IsString()
    os!: string;

    @IsString()
    cliente!: string;

    @IsString()
    tipo!: string;

    @IsString()
    email!: string;
}