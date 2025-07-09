import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateArchivoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  nombreOriginal: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsUUID()
  expedienteId: string;
}
