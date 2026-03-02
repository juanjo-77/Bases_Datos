import {
  obtenerDoctores,
  insertarDoctor,
  eliminarDoctor,
} from '../services/doctores.service.js';

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

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await eliminarDoctor(id);
    res.status(200).json({ response: 'Doctor eliminado', data: eliminado });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
};