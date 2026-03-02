import { Router } from 'express';
import { getDoctores, createDoctor, updateDoctor, deleteDoctor, recoveryDoctor } from '../controllers/doctores.controller.js';

export const doctoresRoutes = Router();

doctoresRoutes.get('/', getDoctores);
doctoresRoutes.post('/', createDoctor);
doctoresRoutes.put('/:id', updateDoctor);
doctoresRoutes.delete('/:id', deleteDoctor);
doctoresRoutes.post('/recovery', recoveryDoctor);
