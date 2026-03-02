import mongoose from 'mongoose';

const acudienteSchema = new mongoose.Schema(
  {
    id: String,
    nombre: String,
    apellido: String,
    email: String,
    edad: Number,
  },
  { timestamps: true }
);

export const AcudienteMongo = mongoose.model('Acudiente', acudienteSchema);
