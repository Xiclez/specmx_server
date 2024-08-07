import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

// Registro de usuario
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ token });
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
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Middleware de autenticación
export const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Logout de usuario
export const logout = (req, res) => {
    // No need to do anything for stateless JWT logout
    res.status(200).json({ message: 'Logged out successfully' });
};

// Obtener el perfil del usuario
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
