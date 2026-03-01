import {
  obtenerUsuarios,
  insertarUsuario,
  eliminarUsuario,
} from '../services/usuarios.service.js';

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json({ response: usuarios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const resultado = await insertarUsuario(nombre, email);
    res.status(201).json({ response: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await eliminarUsuario(id);
    res.status(200).json({ response: 'Usuario eliminado', data: eliminado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};
