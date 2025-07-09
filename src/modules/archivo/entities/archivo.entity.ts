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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  nombreOriginal: string;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column()
  fechaSubida: Date;

  @Column()
  expedienteId: string;

  @ManyToOne(() => Expediente, (expediente) => expediente.archivos, {
    onDelete: 'CASCADE',
  })
  expediente: Expediente;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
