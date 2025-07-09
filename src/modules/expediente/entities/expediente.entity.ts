import { ApiProperty } from '@nestjs/swagger';
import { Archivo } from 'src/modules/archivo/entities/archivo.entity';
import { Cliente } from 'src/modules/cliente/entities/cliente.entity';
import { TipoExpediente } from 'src/modules/tipo-expediente/entities/tipo-expediente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('expedientes')
export class Expediente {
  @ApiProperty({
    example: 'uuid',
    description: 'Identificador único del expediente',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Demanda por incumplimiento',
    description: 'Título del expediente',
  })
  @Column()
  titulo: string;

  @ApiProperty({
    example: 'Expediente relacionado con una demanda civil',
    description: 'Descripción del expediente',
  })
  @Column()
  descripcion: string;

  @ApiProperty({
    example: 'EXP-20250709-001',
    description: 'Número único de referencia del expediente',
  })
  @Column({ unique: true })
  numeroReferencia: string;

  @ApiProperty({ example: 'uuid', description: 'ID del tipo de expediente' })
  @Column()
  tipoExpedienteId: string;

  @ApiProperty({
    example: 'Abierto',
    description: 'Estado actual del expediente',
  })
  @Column()
  estado: string;

  @ApiProperty({
    example: '2025-07-09T14:00:00.000Z',
    description: 'Fecha en que se abrió el expediente',
  })
  @Column({ type: 'timestamptz' })
  fechaApertura: Date;

  @ApiProperty({
    example: '2025-08-15T14:00:00.000Z',
    description: 'Fecha en que se cerró el expediente (si aplica)',
    required: false,
  })
  @Column({ type: 'timestamptz', nullable: true })
  fechaCierre: Date;

  @ApiProperty({
    example: 'Etapa de conciliación',
    description: 'Etapa procesal actual',
    required: false,
  })
  @Column({ nullable: true })
  etapaProcesal: string;

  @ApiProperty({
    example: 'Juzgado Primero Civil Municipal',
    description: 'Nombre del juzgado asignado',
    required: false,
  })
  @Column({ nullable: true })
  juzgado: string;

  @ApiProperty({ example: 'uuid', description: 'ID del cliente asociado' })
  @Column()
  clienteId: string;

  @ApiProperty({
    type: () => Cliente,
    description: 'Cliente relacionado con el expediente',
  })
  @ManyToOne(() => Cliente, (cliente) => cliente.expedientes, { eager: true })
  cliente: Cliente;

  @ApiProperty({
    type: () => [Archivo],
    description: 'Archivos vinculados al expediente',
  })
  @OneToMany(() => Archivo, (archivo) => archivo.expediente, {
    cascade: true,
  })
  archivos: Archivo[];

  @ApiProperty({
    type: () => TipoExpediente,
    description: 'Tipo de expediente',
  })
  @ManyToOne(() => TipoExpediente, (tipo) => tipo.expedientes, { eager: true })
  tipoExpediente: TipoExpediente;

  @ApiProperty({
    example: '2025-07-09T15:00:00.000Z',
    description: 'Fecha de creación del registro',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-09T15:30:00.000Z',
    description: 'Fecha de última actualización',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({
    example: '2025-07-10T10:00:00.000Z',
    description: 'Fecha de eliminación lógica',
    required: false,
  })
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
