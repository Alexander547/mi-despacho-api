import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { TipoExpedienteService } from '../src/modules/tipo-expediente/tipo-expediente.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const tipoExpedienteService = app.get(TipoExpedienteService);

  const tipos = [
    {
      nombre: 'Civil',
      descripcion: 'Procesos relacionados con el derecho civil',
    },
    {
      nombre: 'Laboral',
      descripcion: 'Conflictos entre empleadores y empleados',
    },
    { nombre: 'Penal', descripcion: 'Procesos penales y delitos' },
    {
      nombre: 'Familiar',
      descripcion: 'Procesos de familia (divorcio, custodia, etc.)',
    },
    {
      nombre: 'Administrativo',
      descripcion: 'Conflictos con el Estado o entidades públicas',
    },
    {
      nombre: 'Comercial',
      descripcion: 'Procesos relacionados con empresas o negocios',
    },
  ];

  for (const tipo of tipos) {
    const exists = await tipoExpedienteService.findAll();
    const alreadyExists = exists.some((t) => t.nombre === tipo.nombre);
    if (!alreadyExists) {
      await tipoExpedienteService.create(tipo);
      console.log(`✔ Tipo "${tipo.nombre}" creado`);
    } else {
      console.log(`ℹ Tipo "${tipo.nombre}" ya existe`);
    }
  }

  await app.close();
}

bootstrap();
