import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
});

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
    NumeroInterior: { type: String, default: null },
    CP: { type: String, default: null },    
    telefono: { type: String, default: null },
    CURP: { type: String, default: null },
    RFC: { type: String, default: null },
    files: [fileSchema],
    empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: false }
}, { timestamps: true });

const Cliente = mongoose.model('Cliente', clienteSchema);
export default Cliente;
