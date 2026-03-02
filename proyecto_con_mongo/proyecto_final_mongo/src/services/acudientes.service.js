import { pool } from '../config/database/pgconfig.js';
import { HttpError } from '../errors/HttpError.js';
import { AcudienteMongo } from '../models/acudiente.model.js';

export const obtenerAcudientes = async () => {
  const query = 'SELECT * FROM acudientes';
  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

export const insertarAcudiente = async (nombre, apellido, email, edad) => {
  const query = 'CALL insertar_acudiente($1, $2, $3, $4)';
  try {
    await pool.query(query, [nombre, apellido, email, edad]);
    return { mensaje: 'Acudiente creado correctamente' };
  } catch (error) {
    throw error;
  }
};

export const actualizarAcudiente = async (id, nombre, apellido, email, edad) => {
  const query = `UPDATE acudientes SET nombre=$1, apellido=$2, email=$3, edad=$4 WHERE id=$5 RETURNING *`;
  try {
    const response = await pool.query(query, [nombre, apellido, email, edad, id]);
    if (response.rowCount === 0) throw new HttpError('Acudiente no encontrado', 404);
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

export const eliminarAcudiente = async (id) => {
  const query = 'DELETE FROM acudientes WHERE id=$1 RETURNING id, nombre, apellido, email, edad';
  try {
    const response = await pool.query(query, [id]);
    if (response.rowCount === 0) throw new HttpError('Acudiente no encontrado', 404);
    const acudienteEliminado = new AcudienteMongo(response.rows[0]);
    await acudienteEliminado.save();
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

export const recuperarAcudiente = async (email) => {
  try {
    const enMongo = await AcudienteMongo.findOne({ email });
    if (!enMongo) throw new HttpError('No se encontro en la papelera', 404);
    const query = 'INSERT INTO acudientes (id, nombre, apellido, email, edad) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const response = await pool.query(query, [enMongo.id, enMongo.nombre, enMongo.apellido, enMongo.email, enMongo.edad]);
    await AcudienteMongo.deleteOne({ email });
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};
