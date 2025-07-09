import { Module } from '@nestjs/common';
import { TipoExpedienteService } from './tipo-expediente.service';
import { TipoExpedienteController } from './tipo-expediente.controller';
import { TipoExpediente } from './entities/tipo-expediente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoExpediente])],
  controllers: [TipoExpedienteController],
  providers: [TipoExpedienteService],
  exports: [TipoExpedienteService],
})
export class TipoExpedienteModule {}
