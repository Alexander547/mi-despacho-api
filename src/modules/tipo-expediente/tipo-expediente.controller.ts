import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoExpedienteService } from './tipo-expediente.service';
import { CreateTipoExpedienteDto } from './dto/create-tipo-expediente.dto';
import { UpdateTipoExpedienteDto } from './dto/update-tipo-expediente.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de Expediente')
@Controller('tipo-expediente')
export class TipoExpedienteController {
  constructor(private readonly tipoExpedienteService: TipoExpedienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de expediente' })
  @ApiResponse({
    status: 201,
    description: 'Tipo de expediente creado exitosamente.',
  })
  create(@Body() createTipoExpedienteDto: CreateTipoExpedienteDto) {
    return this.tipoExpedienteService.create(createTipoExpedienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los tipos de expediente' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de expediente.' })
  findAll() {
    return this.tipoExpedienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de expediente por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del tipo de expediente',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Tipo de expediente encontrado.' })
  @ApiResponse({
    status: 404,
    description: 'Tipo de expediente no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.tipoExpedienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de expediente' })
  @ApiParam({
    name: 'id',
    description: 'ID del tipo de expediente a actualizar',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Tipo de expediente actualizado.' })
  update(
    @Param('id') id: string,
    @Body() updateTipoExpedienteDto: UpdateTipoExpedienteDto,
  ) {
    return this.tipoExpedienteService.update(id, updateTipoExpedienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de expediente (soft delete)' })
  @ApiParam({
    name: 'id',
    description: 'ID del tipo de expediente a eliminar',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Tipo de expediente eliminado.' })
  remove(@Param('id') id: string) {
    return this.tipoExpedienteService.remove(id);
  }
}
