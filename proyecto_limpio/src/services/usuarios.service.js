import { pool } from '../config/database/pgconfig.js';
import { HttpError } from '../errors/HttpError.js';

export const obtenerUsuarios = async () => {
  const query = 'SELECT * FROM usuarios';
  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error('Error en obtenerUsuarios:', error.message);
    throw error;
  }
};

export const insertarUsuario = async (nombre, apellido, email, edad) => {
  const query = 'CALL insertar_usuario($1, $2, $3, $4)';
  const values = [nombre, apellido, email, edad];
  try {
    await pool.query(query, values);
    return { mensaje: 'Usuario creado correctamente' };
  } catch (error) {
    console.error('Error en insertarUsuario:', error.message);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING id, nombre, email';
  const values = [id];
  try {
    const response = await pool.query(query, values);
    if (response.rowCount === 0) {
      throw new HttpError('Usuario no encontrado', 404);
    }
    return response.rows[0];
  } catch (error) {
    console.error('Error en eliminarUsuario:', error.message);
    throw error;
  }
};


export const actualizarUsuario = async (id, nombre, apellido, email, edad) => {
  const query = `
    UPDATE usuarios 
    SET nombre = $1, apellido = $2, email = $3, edad = $4
    WHERE id = $5
    RETURNING id, nombre, apellido, email, edad
  `;
  const values = [nombre, apellido, email, edad, id];
  try {
    const response = await pool.query(query, values);
    if (response.rowCount === 0) {
      throw new HttpError('Usuario no encontrado', 404);
    }
    return response.rows[0];
  } catch (error) {
    console.error('Error en actualizarUsuario:', error.message);
    throw error;
  }
};