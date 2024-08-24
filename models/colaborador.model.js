import mongoose from 'mongoose';

const colaboradorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    area: { type: String, required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
}, { timestamps: true });

const Colaborador = mongoose.model('Colaborador', colaboradorSchema);
export default Colaborador;
