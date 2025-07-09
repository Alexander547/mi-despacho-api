import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'FALTANTE_HOST',
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DB_USER || 'FALTANTE_USER',
  password: process.env.DB_PASS || 'FALTANTE_PASS',
  database: process.env.DB_NAME || 'FALTANTE_DB',
}));
