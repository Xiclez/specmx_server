import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
    fechaEmision: { type: Date, required: true },
    monto: { type: mongoose.Types.Decimal128, required: true },
    estado: { type: String, enum: ['Pagada', 'Pendiente', 'Cancelada'], required: true },
    servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: false }
}, { timestamps: true });

const Factura = mongoose.model('Factura', facturaSchema);
export default Factura;
