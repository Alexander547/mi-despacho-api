import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoExpedienteDto } from './dto/create-tipo-expediente.dto';
import { UpdateTipoExpedienteDto } from './dto/update-tipo-expediente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoExpediente } from './entities/tipo-expediente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoExpedienteService {
  constructor(
    @InjectRepository(TipoExpediente)
    private readonly tipoExpedienteRepo: Repository<TipoExpediente>,
  ) {}

  async create(createDto: CreateTipoExpedienteDto): Promise<TipoExpediente> {
    const tipo = this.tipoExpedienteRepo.create(createDto);
    return this.tipoExpedienteRepo.save(tipo);
  }

  async findAll(): Promise<TipoExpediente[]> {
    return this.tipoExpedienteRepo.find();
  }

  async findOne(id: string): Promise<TipoExpediente> {
    const tipo = await this.tipoExpedienteRepo.findOne({ where: { id } });
    if (!tipo)
      throw new NotFoundException(`Tipo de expediente ${id} no encontrado`);
    return tipo;
  }

  async update(
    id: string,
    updateDto: UpdateTipoExpedienteDto,
  ): Promise<TipoExpediente> {
    const tipo = await this.findOne(id);
    const updated = this.tipoExpedienteRepo.merge(tipo, updateDto);
    return this.tipoExpedienteRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tipoExpedienteRepo.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de expediente ${id} no encontrado`);
    }
  }
}
