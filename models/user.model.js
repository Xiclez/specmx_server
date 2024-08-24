import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: null },
    rol: { 
        type: String, 
        enum: ['Administrador', 'Cliente', 'Colaborador', 'Usuario'], 
        default: 'Usuario',
        required: true 
    },
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: false }, 
    colaboradorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Colaborador', required: false }, 
}, { timestamps: true });

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
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
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
