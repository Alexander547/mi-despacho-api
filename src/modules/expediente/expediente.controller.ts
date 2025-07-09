import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpedienteService } from './expediente.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Expedientes')
@Controller('expediente')
export class ExpedienteController {
  constructor(private readonly expedienteService: ExpedienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo expediente' })
  @ApiResponse({ status: 201, description: 'Expediente creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createExpedienteDto: CreateExpedienteDto) {
    return this.expedienteService.create(createExpedienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los expedientes' })
  @ApiResponse({ status: 200, description: 'Lista de expedientes.' })
  findAll() {
    return this.expedienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un expediente por su ID' })
  @ApiParam({ name: 'id', description: 'UUID del expediente' })
  @ApiResponse({ status: 200, description: 'Expediente encontrado.' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.expedienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un expediente por su ID' })
  @ApiParam({ name: 'id', description: 'UUID del expediente a actualizar' })
  @ApiResponse({ status: 200, description: 'Expediente actualizado.' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateExpedienteDto: UpdateExpedienteDto,
  ) {
    return this.expedienteService.update(id, updateExpedienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un expediente por su ID (soft delete)' })
  @ApiParam({ name: 'id', description: 'UUID del expediente a eliminar' })
  @ApiResponse({ status: 200, description: 'Expediente eliminado.' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado.' })
  remove(@Param('id') id: string) {
    return this.expedienteService.remove(id);
  }
}
