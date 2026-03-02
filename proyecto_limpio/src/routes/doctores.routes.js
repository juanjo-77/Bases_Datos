import { Router } from 'express';
import {
  getDoctores,
  createDoctor,
  deleteDoctor,
} from '../controllers/doctores.controller.js';

export const doctoresRoutes = Router();

doctoresRoutes.get('/', getDoctores);
doctoresRoutes.post('/', createDoctor);
doctoresRoutes.delete('/:id', deleteDoctor);