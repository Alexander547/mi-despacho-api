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

@Controller('tipo-expediente')
export class TipoExpedienteController {
  constructor(private readonly tipoExpedienteService: TipoExpedienteService) {}

  @Post()
  create(@Body() createTipoExpedienteDto: CreateTipoExpedienteDto) {
    return this.tipoExpedienteService.create(createTipoExpedienteDto);
  }

  @Get()
  findAll() {
    return this.tipoExpedienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoExpedienteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoExpedienteDto: UpdateTipoExpedienteDto,
  ) {
    return this.tipoExpedienteService.update(id, updateTipoExpedienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoExpedienteService.remove(id);
  }
}
