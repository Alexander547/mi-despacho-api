import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  identificacion: string;

  @IsString()
  @IsNotEmpty()
  tipoIdentificacion: string;

  @IsString()
  @Matches(/^[0-9+\-() ]{6,20}$/, {
    message: 'El teléfono debe tener entre 6 y 20 caracteres válidos',
  })
  telefono: string;

  @IsEmail()
  correo: string;
}
