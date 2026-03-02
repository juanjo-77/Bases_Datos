import { Router } from 'express';
import { getAcudientes, createAcudiente, updateAcudiente, deleteAcudiente, recoveryAcudiente } from '../controllers/acudientes.controller.js';

export const acudientesRoutes = Router();

acudientesRoutes.get('/', getAcudientes);
acudientesRoutes.post('/', createAcudiente);
acudientesRoutes.put('/:id', updateAcudiente);
acudientesRoutes.delete('/:id', deleteAcudiente);
acudientesRoutes.post('/recovery', recoveryAcudiente);
