import mongoose from 'mongoose';

const colaboradorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    area: { type: String, required: true },
    tareaId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tarea',
        required: false,
        validate: {
          validator: function(value) {
            return !Array.isArray(value) || value.length === new Set(value.map(String)).size;
          },
          message: 'No se puede asignar la misma tarea más de una vez'
        }
    }]
}, { timestamps: true });

const Colaborador = mongoose.model('Colaborador', colaboradorSchema);
export default Colaborador;
