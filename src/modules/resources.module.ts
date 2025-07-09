import { Module } from '@nestjs/common';
import { ArchivoModule } from './archivo/archivo.module';
import { ClienteModule } from './cliente/cliente.module';
import { ExpedienteModule } from './expediente/expediente.module';
import { TipoExpedienteModule } from './tipo-expediente/tipo-expediente.module';

const modules = [
  ArchivoModule,
  ClienteModule,
  ExpedienteModule,
  TipoExpedienteModule,
];
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class ResourcesModule {}
