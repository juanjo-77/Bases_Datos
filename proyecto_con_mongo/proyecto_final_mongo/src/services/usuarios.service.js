import { pool } from '../config/database/pgconfig.js';
import { HttpError } from '../errors/HttpError.js';
import { UsuarioMongo } from '../models/usuario.model.js';

export const obtenerUsuarios = async () => {
  const query = 'SELECT * FROM usuarios';
  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

export const insertarUsuario = async (nombre, apellido, email, edad) => {
  const query = 'CALL insertar_usuario($1, $2, $3, $4)';
  try {
    await pool.query(query, [nombre, apellido, email, edad]);
    return { mensaje: 'Usuario creado correctamente' };
  } catch (error) {
    throw error;
  }
};

export const actualizarUsuario = async (id, nombre, apellido, email, edad) => {
  const query = `UPDATE usuarios SET nombre=$1, apellido=$2, email=$3, edad=$4 WHERE id=$5 RETURNING *`;
  try {
    const response = await pool.query(query, [nombre, apellido, email, edad, id]);
    if (response.rowCount === 0) throw new HttpError('Usuario no encontrado', 404);
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  const query = 'DELETE FROM usuarios WHERE id=$1 RETURNING id, nombre, apellido, email, edad';
  try {
    const response = await pool.query(query, [id]);
    if (response.rowCount === 0) throw new HttpError('Usuario no encontrado', 404);
    const usuarioEliminado = new UsuarioMongo(response.rows[0]);
    await usuarioEliminado.save();
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

export const recuperarUsuario = async (email) => {
  try {
    const enMongo = await UsuarioMongo.findOne({ email });
    if (!enMongo) throw new HttpError('No se encontro en la papelera', 404);
    const query = 'INSERT INTO usuarios (id, nombre, apellido, email, edad) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const response = await pool.query(query, [enMongo.id, enMongo.nombre, enMongo.apellido, enMongo.email, enMongo.edad]);
    await UsuarioMongo.deleteOne({ email });
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};
