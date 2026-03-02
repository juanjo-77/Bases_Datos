import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectPostgres } from './config/database/pgconfig.js';
import { usuariosRoutes } from './routes/usuarios.routes.js';
import { doctoresRoutes } from './routes/doctores.routes.js';
import { acudientesRoutes } from './routes/acudientes.routes.js';


await connectPostgres();

const app = express();
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.json({ mensaje: '🚀 API funcionando correctamente' });
});

export default app;

app.use('/usuarios', usuariosRoutes);

// Agrega esta línea debajo de app.use('/usuarios', usuariosRoutes)
app.use('/doctores', doctoresRoutes);

// Ruta debajo de doctores
app.use('/acudientes', acudientesRoutes);