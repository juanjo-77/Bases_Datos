import { pool } from '../config/database/pgconfig.js';
import { HttpError } from '../errors/HttpError.js';

export const obtenerDoctores = async () => {
  // JOIN para traer el nombre de la especialidad en vez del id
  const query = `
    SELECT d.id, d.nombre, d.apellido, d.email, d.edad, e.nombre AS especialidad
    FROM doctores d
    JOIN especialidades e ON d.especialidad_id = e.id
  `;
  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error('Error en obtenerDoctores:', error.message);
    throw error;
  }
};

export const insertarDoctor = async (nombre, apellido, email, edad, especialidad_id) => {
  const query = 'CALL insertar_doctor($1, $2, $3, $4, $5)';
  const values = [nombre, apellido, email, edad, especialidad_id];
  try {
    await pool.query(query, values);
    return { mensaje: 'Doctor creado correctamente' };
  } catch (error) {
    console.error('Error en insertarDoctor:', error.message);
    throw error;
  }
};

export const eliminarDoctor = async (id) => {
  const query = 'DELETE FROM doctores WHERE id = $1 RETURNING id, nombre, apellido';
  const values = [id];
  try {
    const response = await pool.query(query, values);
    if (response.rowCount === 0) {
      throw new HttpError('Doctor no encontrado', 404);
    }
    return response.rows[0];
  } catch (error) {
    console.error('Error en eliminarDoctor:', error.message);
    throw error;
  }
};