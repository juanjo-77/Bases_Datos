import { obtenerAcudientes, insertarAcudiente, actualizarAcudiente, eliminarAcudiente, recuperarAcudiente } from '../services/acudientes.service.js';

export const getAcudientes = async (req, res) => {
  try {
    const acudientes = await obtenerAcudientes();
    res.status(200).json({ response: acudientes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAcudiente = async (req, res) => {
  try {
    const { nombre, apellido, email, edad } = req.body;
    const resultado = await insertarAcudiente(nombre, apellido, email, edad);
    res.status(201).json({ response: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAcudiente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, edad } = req.body;
    const actualizado = await actualizarAcudiente(id, nombre, apellido, email, edad);
    res.status(200).json({ response: actualizado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};

export const deleteAcudiente = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await eliminarAcudiente(id);
    res.status(200).json({ response: 'Acudiente eliminado y guardado en papelera', data: eliminado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};

export const recoveryAcudiente = async (req, res) => {
  try {
    const { email } = req.body;
    const recuperado = await recuperarAcudiente(email);
    res.status(201).json({ response: 'Acudiente recuperado', data: recuperado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};
