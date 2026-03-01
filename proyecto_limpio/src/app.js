import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectPostgres } from './config/database/pgconfig.js';
import { usuariosRoutes } from './routes/usuarios.routes.js';

await connectPostgres();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: '🚀 API funcionando correctamente' });
});

export default app;
