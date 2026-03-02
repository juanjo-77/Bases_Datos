import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    id: String,
    nombre: String,
    apellido: String,
    email: String,
    edad: Number,
  },
  { timestamps: true }
);

export const UsuarioMongo = mongoose.model('Usuario', usuarioSchema);
