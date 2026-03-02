import { Router } from 'express';
import {
  getAcudientes,
  createAcudiente,
  deleteAcudiente,
} from '../controllers/acudientes.controller.js';

export const acudientesRoutes = Router();

acudientesRoutes.get('/', getAcudientes);
acudientesRoutes.post('/', createAcudiente);
acudientesRoutes.delete('/:id', deleteAcudiente);