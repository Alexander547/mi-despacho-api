import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expediente } from './entities/expediente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpedienteService {
  constructor(
    @InjectRepository(Expediente)
    private readonly expedienteRepo: Repository<Expediente>,
  ) {}
  async create(createDto: CreateExpedienteDto): Promise<Expediente> {
    const expediente = this.expedienteRepo.create(createDto);
    return this.expedienteRepo.save(expediente);
  }

  async findAll(): Promise<Expediente[]> {
    return this.expedienteRepo.find({
      relations: {
        cliente: true,
        tipoExpediente: true,
        archivos: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Expediente> {
    const expediente = await this.expedienteRepo.findOne({
      where: { id },
      relations: { cliente: true, tipoExpediente: true, archivos: true },
    });

    if (!expediente) {
      throw new NotFoundException(`Expediente con id ${id} no encontrado`);
    }

    return expediente;
  }

  async update(
    id: string,
    updateDto: UpdateExpedienteDto,
  ): Promise<Expediente> {
    const expediente = await this.findOne(id);
    const updated = this.expedienteRepo.merge(expediente, updateDto);
    return this.expedienteRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.expedienteRepo.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Expediente con id ${id} no encontrado`);
    }
  }
}
