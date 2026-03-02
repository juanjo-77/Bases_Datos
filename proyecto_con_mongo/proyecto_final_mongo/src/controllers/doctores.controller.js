import { obtenerDoctores, insertarDoctor, actualizarDoctor, eliminarDoctor, recuperarDoctor } from '../services/doctores.service.js';

export const getDoctores = async (req, res) => {
  try {
    const doctores = await obtenerDoctores();
    res.status(200).json({ response: doctores });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const { nombre, apellido, email, edad, especialidad_id } = req.body;
    const resultado = await insertarDoctor(nombre, apellido, email, edad, especialidad_id);
    res.status(201).json({ response: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, edad, especialidad_id } = req.body;
    const actualizado = await actualizarDoctor(id, nombre, apellido, email, edad, especialidad_id);
    res.status(200).json({ response: actualizado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await eliminarDoctor(id);
    res.status(200).json({ response: 'Doctor eliminado y guardado en papelera', data: eliminado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};

export const recoveryDoctor = async (req, res) => {
  try {
    const { email } = req.body;
    const recuperado = await recuperarDoctor(email);
    res.status(201).json({ response: 'Doctor recuperado', data: recuperado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};
