import { Router } from 'express';
import {
  getUsuarios,
  createUsuario,
  deleteUsuario,
  updateUsuario
} from '../controllers/usuarios.controller.js';

export const usuariosRoutes = Router();

usuariosRoutes.get('/', getUsuarios);
usuariosRoutes.post('/', createUsuario);
usuariosRoutes.delete('/:id', deleteUsuario);
usuariosRoutes.put('/:id', updateUsuario);