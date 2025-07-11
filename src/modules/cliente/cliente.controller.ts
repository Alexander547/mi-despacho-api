import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cliente } from './entities/cliente.entity';
import { PaginadoDto } from 'src/shared/dto/paginadas.dto';

@ApiTags('Clientes')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente.' })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Post('paginado')
  @ApiOperation({ summary: 'Listado de Clientes paginado' })
  @ApiResponse({ status: 201, description: 'Listar clientes.' })
  findAndCountAll(@Body() dto: PaginadoDto) {
    return this.clienteService.paginados(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes.' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado.',
    type: Cliente,
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado exitosamente.',
    type: Cliente,
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Cliente eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}
