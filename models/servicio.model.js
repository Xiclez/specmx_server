import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: String, required: true },
    tipoServicio: { type: String, required: true },
    proyectoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto', required: false }
}, { timestamps: true });

const Servicio = mongoose.model('Servicio', servicioSchema);
export default Servicio;
