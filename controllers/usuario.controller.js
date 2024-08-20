import User from '../models/user.model.js';

// Obtener la lista de todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Excluye el campo de la contraseña
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password'); // Excluye el campo de la contraseña
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario por su ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, username, telefono, email, password, rol, clienteId, colaboradorId } = req.body;

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.nombre = nombre || user.nombre;
        user.apellido = apellido || user.apellido;
        user.username = username || user.username;
        user.telefono = telefono || user.telefono;
        user.email = email || user.email;
        if (password) {
            user.password = password;
        }
        user.rol = rol || user.rol;
        user.clienteId = clienteId || user.clienteId;
        user.colaboradorId = colaboradorId || user.colaboradorId;

        // La contraseña será encriptada automáticamente en el pre-save del modelo si se actualiza
        await user.save();

        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
