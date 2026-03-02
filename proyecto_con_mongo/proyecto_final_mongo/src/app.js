import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectPostgres } from './config/database/pgconfig.js';
import { connectMongo } from './config/database/mongoconfig.js';
import { usuariosRoutes } from './routes/usuarios.routes.js';
import { doctoresRoutes } from './routes/doctores.routes.js';
import { acudientesRoutes } from './routes/acudientes.routes.js';

// Conectar bases de datos
await connectPostgres();
await connectMongo();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', usuariosRoutes);
app.use('/doctores', doctoresRoutes);
app.use('/acudientes', acudientesRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: '🚀 API funcionando correctamente' });
});

export default app;
