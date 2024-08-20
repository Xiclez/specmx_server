import mongoose from 'mongoose';


const empresaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
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
    telefono: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    RFC: { type: String, required: true },
    sector: { type: String, default: null },
}, { timestamps: true });

const Empresa = mongoose.model('Empresa', empresaSchema);
export default Empresa;
