import mongoose from 'mongoose';

const datosIdentificacionSchema = new mongoose.Schema({
    CURP: { type: String, default: null },
    Nombre: { type: String, default: null },
    ApellidoPaterno: { type: String , default: null},
    ApellidoMaterno: { type: String , default: null},
    FechaNacimiento: { type: String , default: null},
    FechaInicioOperaciones: { type: String, required: true },
    SituacionContribuyente: { type: String, required: true },
    FechaUltimoCambioSituacion: { type: String, required: true },
    DenominacionRazonSocial: { type: String , default: null },
    RegimenCapital: { type: String , default: null},
    FechaConstitucion: { type: String , default: null}
});

const datosUbicacionSchema = new mongoose.Schema({
    EntidadFederativa: { type: String, required: true },
    MunicipioDelegacion: { type: String, required: true },
    Colonia: { type: String, required: true },
    TipoVialidad: { type: String, required: true },
    NombreVialidad: { type: String, required: true },
    NumeroExterior: { type: String, required: true },
    NumeroInterior: { type: String },
    CP: { type: String, required: true },
    CorreoElectronico: { type: String, required: true },
    AL: { type: String, required: true }
});

const caracteristicasFiscalesSchema = new mongoose.Schema({
    Regimen: { type: String, required: true },
    FechaAlta: { type: String }
});

const clienteSchema = new mongoose.Schema({
    datosIdentificacion: { type: datosIdentificacionSchema, required: true },
    datosUbicacion: { type: datosUbicacionSchema, required: true },
    caracteristicasFiscales: { type: [caracteristicasFiscalesSchema], default: [] },
    profilePhoto: { type: String, default: null },  // URL de la foto de perfil
    files: { type: [String], default: [] }  // URLs de archivos adicionales
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
