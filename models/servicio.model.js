import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: String, required: true },
    tipoServicio: { type: String, required: true },
    facturaId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Factura',
        required: false,
        validate: {
          validator: function(value) {
            return !Array.isArray(value) || value.length === new Set(value.map(String)).size;
          },
          message: 'No se puede asignar la misma factura más de una vez'
        }
    }]
}, { timestamps: true });

const Servicio = mongoose.model('Servicio', servicioSchema);
export default Servicio;
