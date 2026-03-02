import { Router } from 'express';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, recoveryUsuario } from '../controllers/usuarios.controller.js';

export const usuariosRoutes = Router();

usuariosRoutes.get('/', getUsuarios);
usuariosRoutes.post('/', createUsuario);
usuariosRoutes.put('/:id', updateUsuario);
usuariosRoutes.delete('/:id', deleteUsuario);
usuariosRoutes.post('/recovery', recoveryUsuario);
