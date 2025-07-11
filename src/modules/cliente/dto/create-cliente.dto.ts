import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsNotEmpty()
  identificacion: string;

  @ApiProperty({ example: 'CC' })
  @IsString()
  @IsNotEmpty()
  tipoIdentificacion: string;

  @ApiProperty({ example: '3001234567', required: true })
  @IsString()
  @Matches(/^[0-9+\-() ]{6,20}$/, {
    message: 'El teléfono debe tener entre 6 y 20 caracteres válidos',
  })
  telefono: string;

  @ApiProperty({ example: 'juan.perez@email.com', required: true })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'https://example.com/images/cliente1.jpg' })
  @IsOptional()
  @IsString()
  imgPerfilUrl: string;
}
