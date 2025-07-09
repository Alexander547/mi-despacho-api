import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { Archivo } from './entities/archivo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo])],
  controllers: [ArchivoController],
  providers: [ArchivoService],
})
export class ArchivoModule {}
