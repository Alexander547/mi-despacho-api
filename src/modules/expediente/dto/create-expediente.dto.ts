import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateExpedienteDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  numeroReferencia: string;

  @IsUUID()
  @IsNotEmpty()
  tipoExpedienteId: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsDateString()
  @IsNotEmpty()
  fechaApertura: string;

  @IsOptional()
  @IsDateString()
  fechaCierre?: string;

  @IsOptional()
  @IsString()
  etapaProcesal?: string;

  @IsOptional()
  @IsString()
  juzgado?: string;

  @IsUUID()
  @IsNotEmpty()
  clienteId: string;
}
