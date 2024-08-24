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
    proyectoId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: false,
        validate: {
            validator: function(value) {
                // Asegura que la validación solo ocurra si value es un array válido
                return !Array.isArray(value) || value.length === new Set(value.map(String)).size;
            },
            message: 'No se puede asignar el mismo proyecto más de una vez'
        }
    }]
}, { timestamps: true });

const Empresa = mongoose.model('Empresa', empresaSchema);
export default Empresa;
