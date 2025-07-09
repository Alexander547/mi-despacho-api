import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateArchivoDto {
  @ApiProperty({
    description: 'Título del archivo',
    example: 'Contrato de arrendamiento',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    description: 'Descripción del archivo',
    example: 'Documento firmado por ambas partes',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Nombre original del archivo subido',
    example: 'contrato_arrendamiento.pdf',
  })
  @IsString()
  @IsNotEmpty()
  nombreOriginal: string;

  @ApiProperty({
    description: 'URL pública del archivo almacenado',
    example: 'https://s3.amazonaws.com/mi-bucket/archivo.pdf',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'Clave interna del archivo en el almacenamiento',
    example: 'archivos/2025/contrato_arrendamiento.pdf',
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    description: 'ID del expediente al que pertenece el archivo',
    example: '5bbcf32b-d055-4bfe-a6b5-83c2a7bce9ee',
  })
  @IsUUID()
  expedienteId: string;
}
