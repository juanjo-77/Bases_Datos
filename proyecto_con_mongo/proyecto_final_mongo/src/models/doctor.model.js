import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    id: String,
    nombre: String,
    apellido: String,
    email: String,
    edad: Number,
    especialidad_id: String,
  },
  { timestamps: true }
);

export const DoctorMongo = mongoose.model('Doctor', doctorSchema);
