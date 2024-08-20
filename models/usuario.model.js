import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { 
        type: String, 
        enum: ['Administrador', 'Contador', 'Consultor', 'Abogado', 'Usuario'], 
        required: true 
    },
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    colaboradorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Colaborador' }
}, { timestamps: true });

// Hash the password before saving the user model
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

// Method to compare passwords
usuarioSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
