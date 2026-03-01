import { Router } from 'express';
import {
  getUsuarios,
  createUsuario,
  deleteUsuario,
} from '../controllers/usuarios.controller.js';

export const usuariosRoutes = Router();

usuariosRoutes.get('/', getUsuarios);
usuariosRoutes.post('/', createUsuario);
usuariosRoutes.delete('/:id', deleteUsuario);
