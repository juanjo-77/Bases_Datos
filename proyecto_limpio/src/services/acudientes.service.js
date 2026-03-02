import { pool } from '../config/database/pgconfig.js';
import { HttpError } from '../errors/HttpError.js';

export const obtenerAcudientes = async () => {
  const query = 'SELECT * FROM acudientes';
  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error('Error en obtenerAcudientes:', error.message);
    throw error;
  }
};

export const insertarAcudiente = async (nombre, apellido, email, edad) => {
  const query = 'CALL insertar_acudiente($1, $2, $3, $4)';
  const values = [nombre, apellido, email, edad];
  try {
    await pool.query(query, values);
    return { mensaje: 'Acudiente creado correctamente' };
  } catch (error) {
    console.error('Error en insertarAcudiente:', error.message);
    throw error;
  }
};

export const eliminarAcudiente = async (id) => {
  const query = 'DELETE FROM acudientes WHERE id = $1 RETURNING id, nombre, apellido';
  const values = [id];
  try {
    const response = await pool.query(query, values);
    if (response.rowCount === 0) {
      throw new HttpError('Acudiente no encontrado', 404);
    }
    return response.rows[0];
  } catch (error) {
    console.error('Error en eliminarAcudiente:', error.message);
    throw error;
  }
};