import { ApiProperty } from '@nestjs/swagger';
import { Expediente } from 'src/modules/expediente/entities/expediente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('archivos')
export class Archivo {
  @ApiProperty({
    description: 'ID único del archivo',
    example: 'd08b9d22-cb93-47c1-8730-354c93b5273b',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Título del archivo',
    example: 'Acta de reunión',
  })
  @Column()
  titulo: string;

  @ApiProperty({
    description: 'Descripción del contenido del archivo',
    example: 'Acta de la reunión ordinaria de junta directiva',
  })
  @Column()
  descripcion: string;

  @ApiProperty({
    description: 'Nombre original del archivo subido',
    example: 'acta_junta_2025.pdf',
  })
  @Column()
  nombreOriginal: string;

  @ApiProperty({
    description: 'URL del archivo en el sistema de almacenamiento',
    example: 'https://s3.amazonaws.com/mi-bucket/acta_junta_2025.pdf',
  })
  @Column()
  url: string;

  @ApiProperty({
    description: 'Clave o key del archivo en el almacenamiento',
    example: 'archivos/acta_junta_2025.pdf',
  })
  @Column()
  key: string;

  @ApiProperty({
    description: 'Fecha en la que se subió el archivo',
    example: '2025-07-09T21:00:00.000Z',
  })
  @Column()
  fechaSubida: Date;

  @ApiProperty({
    description: 'ID del expediente al que pertenece el archivo',
    example: 'a12f90a1-4a53-487a-84d1-2c214ad77fc0',
  })
  @Column()
  expedienteId: string;

  @ApiProperty({ description: 'Expediente relacionado' })
  @ManyToOne(() => Expediente, (expediente) => expediente.archivos, {
    onDelete: 'CASCADE',
  })
  expediente: Expediente;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización del registro' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Fecha de eliminación lógica del registro',
    required: false,
  })
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
