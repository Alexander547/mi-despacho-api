import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArchivoService {
  constructor(
    @InjectRepository(Archivo)
    private readonly archivoRepo: Repository<Archivo>,
  ) {}

  async create(createDto: CreateArchivoDto): Promise<Archivo> {
    const archivo = this.archivoRepo.create(createDto);
    return this.archivoRepo.save(archivo);
  }

  async findAll(): Promise<Archivo[]> {
    return this.archivoRepo.find({
      order: { fechaSubida: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Archivo> {
    const archivo = await this.archivoRepo.findOne({
      where: { id },
    });

    if (!archivo) {
      throw new NotFoundException(`Archivo con id ${id} no encontrado`);
    }

    return archivo;
  }

  async update(id: string, updateDto: UpdateArchivoDto): Promise<Archivo> {
    const archivo = await this.findOne(id);
    const updated = this.archivoRepo.merge(archivo, updateDto);
    return this.archivoRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.archivoRepo.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Archivo con id ${id} no encontrado`);
    }
  }

  async findByExpediente(expedienteId: string): Promise<Archivo[]> {
    return this.archivoRepo.find({
      where: { expedienteId },
      order: { fechaSubida: 'DESC' },
    });
  }
}
