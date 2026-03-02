import { pool } from '../config/database/pgconfig.js';
import { HttpError } from '../errors/HttpError.js';
import { DoctorMongo } from '../models/doctor.model.js';

export const obtenerDoctores = async () => {
  const query = `
    SELECT d.id, d.nombre, d.apellido, d.email, d.edad, e.nombre AS especialidad
    FROM doctores d
    JOIN especialidades e ON d.especialidad_id = e.id
  `;
  try {
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

export const insertarDoctor = async (nombre, apellido, email, edad, especialidad_id) => {
  const query = 'CALL insertar_doctor($1, $2, $3, $4, $5)';
  try {
    await pool.query(query, [nombre, apellido, email, edad, especialidad_id]);
    return { mensaje: 'Doctor creado correctamente' };
  } catch (error) {
    throw error;
  }
};

export const actualizarDoctor = async (id, nombre, apellido, email, edad, especialidad_id) => {
  const query = `UPDATE doctores SET nombre=$1, apellido=$2, email=$3, edad=$4, especialidad_id=$5 WHERE id=$6 RETURNING *`;
  try {
    const response = await pool.query(query, [nombre, apellido, email, edad, especialidad_id, id]);
    if (response.rowCount === 0) throw new HttpError('Doctor no encontrado', 404);
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

export const eliminarDoctor = async (id) => {
  const query = 'DELETE FROM doctores WHERE id=$1 RETURNING id, nombre, apellido, email, edad, especialidad_id';
  try {
    const response = await pool.query(query, [id]);
    if (response.rowCount === 0) throw new HttpError('Doctor no encontrado', 404);
    const doctorEliminado = new DoctorMongo(response.rows[0]);
    await doctorEliminado.save();
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

export const recuperarDoctor = async (email) => {
  try {
    const enMongo = await DoctorMongo.findOne({ email });
    if (!enMongo) throw new HttpError('No se encontro en la papelera', 404);
    const query = 'INSERT INTO doctores (id, nombre, apellido, email, edad, especialidad_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
    const response = await pool.query(query, [enMongo.id, enMongo.nombre, enMongo.apellido, enMongo.email, enMongo.edad, enMongo.especialidad_id]);
    await DoctorMongo.deleteOne({ email });
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};
