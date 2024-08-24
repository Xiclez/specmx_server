import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
});
const facturaSchema = new mongoose.Schema({
    fechaEmision: { type: Date, required: true },
    monto: { type: String, required: true },
    estado: { type: String, enum: ['Pagada', 'Pendiente', 'Cancelada'], required: true },
    files: [fileSchema],
    servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: false }
}, { timestamps: true });

const Factura = mongoose.model('Factura', facturaSchema);
export default Factura;
