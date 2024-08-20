import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

// Registro de usuario
export const register = async (req, res) => {
    const { nombre, apellido, username, telefono, email, password, rol, clienteId, colaboradorId } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const user = new User({
            nombre,
            apellido,
            username,
            telefono,
            email,
            password,
            rol,
            clienteId,
            colaboradorId
        });

        // La contraseña será encriptada automáticamente en el pre-save del modelo
        await user.save();

        const token = jwt.sign({ userId: user._id, rol: user.rol }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login de usuario
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Correo electrónico o contraseña inválidos' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Correo electrónico o contraseña inválidos' });
        }

        const token = jwt.sign({ userId: user._id, rol: user.rol }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Middleware de autenticación
export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, no se proporcionó token' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        req.rol = decoded.rol;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};

// Logout de usuario
export const logout = (req, res) => {
    // No es necesario hacer nada para el logout en JWT, ya que es stateless
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
};

// Obtener el perfil del usuario autenticado
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
