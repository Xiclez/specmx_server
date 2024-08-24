import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: { type: String, required: false },
    url: { type: String, required: false }
});

const proyectoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    estado: { type: String, enum: ['Activo', 'En Proceso', 'Completado', 'Cancelado'], required: true },
    files: [fileSchema],
    servicioId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: false,
        validate: {
          validator: function(value) {
            return !Array.isArray(value) || value.length === new Set(value.map(String)).size;
          },
          message: 'No se puede asignar el mismo servicio más de una vez'
        }
    }],
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

const Proyecto = mongoose.model('Proyecto', proyectoSchema);
export default Proyecto;
