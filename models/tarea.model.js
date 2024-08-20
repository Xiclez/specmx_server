import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    estado: { type: String, enum: ['Pendiente', 'En Proceso', 'Completada'], required: true },
    proyectoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto', required: false },
    colaboradorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Colaborador', required: false }
}, { timestamps: true });

const Tarea = mongoose.model('Tarea', tareaSchema);
export default Tarea;
