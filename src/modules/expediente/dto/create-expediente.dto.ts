import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateExpedienteDto {
  @ApiProperty({
    example: 'Demanda por incumplimiento',
    description: 'Título del expediente',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    example: 'Expediente legal contra un proveedor',
    description: 'Descripción del expediente',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    example: 'EXP-20250709-001',
    description: 'Número único de referencia',
  })
  @IsString()
  @IsNotEmpty()
  numeroReferencia: string;

  @ApiProperty({
    example: 'a42d4ec5-84df-4c44-91f1-5c14269e392f',
    description: 'ID del tipo de expediente',
  })
  @IsUUID()
  @IsNotEmpty()
  tipoExpedienteId: string;

  @ApiProperty({
    example: 'Abierto',
    description: 'Estado actual del expediente',
  })
  @IsString()
  @IsNotEmpty()
  estado: string;

  @ApiProperty({
    example: '2025-07-09T14:00:00.000Z',
    description: 'Fecha de apertura del expediente (formato ISO)',
  })
  @IsDateString()
  @IsNotEmpty()
  fechaApertura: string;

  @ApiPropertyOptional({
    example: '2025-08-15T14:00:00.000Z',
    description: 'Fecha de cierre (opcional)',
  })
  @IsOptional()
  @IsDateString()
  fechaCierre?: string;

  @ApiPropertyOptional({
    example: 'Etapa de conciliación',
    description: 'Etapa procesal actual (opcional)',
  })
  @IsOptional()
  @IsString()
  etapaProcesal?: string;

  @ApiPropertyOptional({
    example: 'Juzgado Primero Civil Municipal',
    description: 'Nombre del juzgado asignado (opcional)',
  })
  @IsOptional()
  @IsString()
  juzgado?: string;

  @ApiProperty({
    example: 'c51d3a13-40f8-4f3f-8dfb-fbf21ffdf342',
    description: 'ID del cliente asociado',
  })
  @IsUUID()
  @IsNotEmpty()
  clienteId: string;
}
