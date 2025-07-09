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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ unique: true })
  numeroReferencia: string;

  @Column()
  tipoExpedienteId: string;

  @Column()
  estado: string;

  @Column({ type: 'timestamptz' })
  fechaApertura: Date;

  @Column({ type: 'timestamptz', nullable: true })
  fechaCierre: Date;

  @Column({ nullable: true })
  etapaProcesal: string;

  @Column({ nullable: true })
  juzgado: string;

  @Column()
  clienteId: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.expedientes, { eager: true })
  cliente: Cliente;

  @OneToMany(() => Archivo, (archivo) => archivo.expediente, {
    cascade: true,
  })
  archivos: Archivo[];

  @ManyToOne(() => TipoExpediente, (tipo) => tipo.expedientes, { eager: true })
  tipoExpediente: TipoExpediente;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
