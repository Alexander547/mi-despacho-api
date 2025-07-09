import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoExpedienteDto {
  @ApiProperty({
    description: 'Nombre del tipo de expediente',
    example: 'Civil',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del tipo de expediente',
    example: 'Expedientes relacionados con procesos civiles',
  })
  @IsOptional()
  @IsString()
  descripcion: string;
}
