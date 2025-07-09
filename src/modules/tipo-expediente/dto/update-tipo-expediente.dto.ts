import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoExpedienteDto } from './create-tipo-expediente.dto';

export class UpdateTipoExpedienteDto extends PartialType(CreateTipoExpedienteDto) {}
