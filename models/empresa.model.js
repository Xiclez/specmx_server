import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: { type: String, required: false },
    url: { type: String, required: false }
});

const empresaSchema = new mongoose.Schema({
    DenominacionRazonSocial: { type: String, default: null },
    RegimenCapital: { type: String, default: null },
    FechaConstitucion: { type: String, default: null },
    EntidadFederativa: { type: String, required: true },
    MunicipioDelegacion: { type: String, required: true },
    Colonia: { type: String, required: true },
    NombreVialidad: { type: String, required: true },
    NumeroExterior: { type: String, required: true },
    NumeroInterior: { type: String },
    CP: { type: String, required: true },
    telefono: { type: String, required: false },
    RFC: { type: String, required: true },
    sector: { type: String, default: null },
    files: [fileSchema],
}, { timestamps: true });

const Empresa = mongoose.model('Empresa', empresaSchema);
export default Empresa;
