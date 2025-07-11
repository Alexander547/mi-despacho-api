import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { PaginadoDto } from 'src/shared/dto/paginadas.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async create(createDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepo.create(createDto);
    return this.clienteRepo.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepo.find({
      relations: {
        expedientes: true, // para traer los expedientes del cliente
      },
      order: {
        nombres: 'ASC',
      },
    });
  }

  async paginados(dto: PaginadoDto) {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;
    const [clientes, total] = await this.clienteRepo.findAndCount({
      order: { createdAt: 'ASC' },
      skip,
      take: limit,
      relations: {
        expedientes: true,
      },
    });
    const clientesWithCounts = clientes.map((cliente) => ({
      ...cliente,
      expedientesCount: cliente.expedientes?.length || 0,
      expedientes: undefined, //
    }));

    return { clientes: clientesWithCounts, total };
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepo.findOne({
      where: { id },
      relations: { expedientes: { archivos: true } },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }

    return cliente;
  }

  async update(id: string, updateDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    const updated = this.clienteRepo.merge(cliente, updateDto);
    return this.clienteRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.clienteRepo.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }
  }

  // cliente.service.ts

  async findByIdentificacion(identificacion: string): Promise<Cliente | null> {
    return this.clienteRepo.findOne({
      where: { identificacion },
    });
  }

  async findByCorreo(correo: string): Promise<Cliente | null> {
    return this.clienteRepo.findOne({ where: { correo } });
  }
}
