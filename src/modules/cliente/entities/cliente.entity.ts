import { ApiProperty } from '@nestjs/swagger';
import { Expediente } from 'src/modules/expediente/entities/expediente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @ApiProperty({
    example: 'uuid',
    description: 'Identificador único del cliente',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Juan', description: 'Nombres del cliente' })
  @Column()
  nombres: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellidos del cliente' })
  @Column()
  apellidos: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Número de identificación único',
  })
  @Column({ unique: true })
  identificacion: string;

  @ApiProperty({
    example: 'CC',
    description: 'Tipo de identificación (CC, CE, etc.)',
  })
  @Column()
  tipoIdentificacion: string;

  @ApiProperty({
    example: '3101234567',
    description: 'Número de teléfono',
    required: true,
  })
  @Column()
  telefono: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico',
    required: true,
  })
  @Column()
  correo: string;

  @ApiProperty({
    type: () => [Expediente],
    description: 'Lista de expedientes del cliente',
  })
  @OneToMany(() => Expediente, (expediente) => expediente.cliente)
  expedientes: Expediente[];

  @ApiProperty({
    example: '2025-07-09T15:00:00.000Z',
    description: 'Fecha de creación',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-09T16:00:00.000Z',
    description: 'Fecha de actualización',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({
    example: '2025-07-10T00:00:00.000Z',
    description: 'Fecha de eliminación (soft delete)',
    required: false,
  })
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
