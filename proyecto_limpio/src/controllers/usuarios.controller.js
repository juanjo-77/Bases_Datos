import {
  obtenerUsuarios,
  insertarUsuario,
  eliminarUsuario,
  actualizarUsuario
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
    const { nombre, apellido, email, edad } = req.body;
    const resultado = await insertarUsuario(nombre, apellido, email, edad);
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


// Agrega al import arriba

// Agrega esta función al final
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, edad } = req.body;
    const actualizado = await actualizarUsuario(id, nombre, apellido, email, edad);
    res.status(200).json({ response: actualizado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};