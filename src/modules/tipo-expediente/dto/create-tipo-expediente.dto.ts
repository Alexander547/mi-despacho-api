import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoExpedienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion: string;
}
