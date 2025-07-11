import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ClienteService } from '../src/modules/cliente/cliente.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const clienteService = app.get<ClienteService>(ClienteService);

  for (let i = 1; i <= 10; i++) {
    const identificacion = `12345678${i}`;
    const correo = `cliente${i}@example.com`;

    // Verificamos si ya existe el cliente
    let existing = await clienteService.findByIdentificacion(identificacion);
    if (!existing) {
      existing = await clienteService.findByCorreo(correo);
    }
    if (existing) {
      console.log(`ℹ Cliente ya existe`);
      continue;
    }

    if (!existing) {
      await clienteService.create({
        nombres: `Cliente${i}`,
        apellidos: `Apellido${i}`,
        identificacion,
        tipoIdentificacion: 'CC',
        telefono: `31012345${(10 + i).toString().padStart(2, '0')}`,
        correo,
        imgPerfilUrl: `https://i.pravatar.cc/150?img=${i + 10}`,
      });
      console.log(`✔ Cliente${i} creado`);
    } else {
      console.log(`ℹ Cliente${i} ya existe`);
    }
  }

  await app.close();
}

bootstrap();
