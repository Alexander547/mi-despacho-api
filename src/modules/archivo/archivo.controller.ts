import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Archivo } from './entities/archivo.entity';

@ApiTags('Archivos')
@Controller('archivo')
export class ArchivoController {
  constructor(private readonly archivoService: ArchivoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo archivo' })
  @ApiResponse({
    status: 201,
    description: 'Archivo creado exitosamente',
    type: Archivo,
  })
  @ApiBody({ type: CreateArchivoDto })
  create(@Body() createArchivoDto: CreateArchivoDto) {
    return this.archivoService.create(createArchivoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los archivos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de archivos',
    type: [Archivo],
  })
  findAll() {
    return this.archivoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un archivo por ID' })
  @ApiParam({ name: 'id', description: 'ID del archivo' })
  @ApiResponse({
    status: 200,
    description: 'Archivo encontrado',
    type: Archivo,
  })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  findOne(@Param('id') id: string) {
    return this.archivoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un archivo por ID' })
  @ApiParam({ name: 'id', description: 'ID del archivo a actualizar' })
  @ApiBody({ type: UpdateArchivoDto })
  @ApiResponse({
    status: 200,
    description: 'Archivo actualizado correctamente',
    type: Archivo,
  })
  update(@Param('id') id: string, @Body() updateArchivoDto: UpdateArchivoDto) {
    return this.archivoService.update(id, updateArchivoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un archivo por ID (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del archivo a eliminar' })
  @ApiResponse({ status: 200, description: 'Archivo eliminado correctamente' })
  remove(@Param('id') id: string) {
    return this.archivoService.remove(id);
  }
}
