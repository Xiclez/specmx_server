import mongoose from 'mongoose';

const proyectoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    estado: { type: String, enum: ['Activo', 'En Proceso', 'Completado', 'Cancelado'], required: true },
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: false }
}, { timestamps: true });

const Proyecto = mongoose.model('Proyecto', proyectoSchema);
export default Proyecto;
