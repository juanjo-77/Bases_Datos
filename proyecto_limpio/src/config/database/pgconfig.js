import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export let pool;

export const connectPostgres = async () => {
  try {
    const poolPg = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
    });

    await poolPg.connect();
    console.log('✅ PostgreSQL conectado');
    pool = poolPg;
  } catch (error) {
    console.error('❌ Error conectando PostgreSQL:', error.message);
    process.exit(1);
  }
};
