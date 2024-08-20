import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
    Nombre: { type: String, default: null },
    ApellidoPaterno: { type: String, default: null },
    ApellidoMaterno: { type: String, default: null },
    FechaNacimiento: { type: String, default: null },
    EntidadFederativa: { type: String, default: null },
    MunicipioDelegacion: { type: String, default: null },
    Colonia: { type: String, default: null },
    NombreVialidad: { type: String, default: null },
    NumeroExterior: { type: String, default: null },
    NumeroInterior: { type: String },
    CP: { type: String, default: null },    
    telefono: { type: String, default: null },
    email: { type: String, default: null, unique: true },
    CURP: { type: String, default: null },
    RFC: { type: String, default: null },
    profilePhoto: { type: String, default: null },  // URL de la foto de perfil
    files: { type: [String], default: [] },
    empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: false }
}, { timestamps: true });

const Cliente2 = mongoose.model('Cliente2', clienteSchema);
export default Cliente2;
