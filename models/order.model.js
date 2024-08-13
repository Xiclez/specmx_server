// models/Order.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const logSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refiera al modelo de usuario (Cliente o Colaborador)
    comment: { type: String, required: true },
    files: [{ type: String }] // Array de URLs de archivos subidos a Cloudinary
}, { timestamps: true });

const orderSchema = new Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Cliente asociado
    collaboratorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Colaborador asignado
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['En progreso', 'Cancelado', 'Finalizado'], default: 'En progreso' },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    logs: [logSchema] // Array de logs de la orden
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
