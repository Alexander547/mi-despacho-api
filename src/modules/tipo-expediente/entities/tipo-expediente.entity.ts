import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Expediente } from 'src/modules/expediente/entities/expediente.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('tipos_expediente')
export class TipoExpediente {
  @ApiProperty({
    description: 'ID único del tipo de expediente',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del tipo de expediente',
    example: 'Civil',
  })
  @Column({ unique: true })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del tipo de expediente',
    example: 'Casos civiles y familiares',
    required: false,
  })
  @Column({ nullable: true })
  descripcion: string;

  @ApiHideProperty()
  @OneToMany(() => Expediente, (expediente) => expediente.tipoExpediente)
  expedientes: Expediente[];

  @ApiProperty({
    description: 'Fecha de creación',
    type: String,
    format: 'date-time',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    type: String,
    format: 'date-time',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiHideProperty()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
