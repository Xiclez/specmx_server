import Colaborador from '../models/colaborador.model.js';

// Crear un nuevo colaborador
export const createColaborador = async (req, res) => {
    const { nombre, apellido, telefono, area, tareaId } = req.body;

    try {
        const colaborador = new Colaborador({
            nombre,
            apellido,
            telefono,
            area,
            tareaId: Array.isArray(tareaId) ? tareaId : (tareaId ? [tareaId] : [])
        });

        await colaborador.save();
        res.status(201).json({ message: 'Colaborador creado exitosamente', colaborador });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener la lista de todos los colaboradores
export const getColaboradores = async (req, res) => {
    try {
        const colaboradores = await Colaborador.find().populate('tareaId', 'nombre descripcion');
        res.status(200).json(colaboradores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un colaborador por su ID
export const getColaboradorById = async (req, res) => {
    const { id } = req.params;

    try {
        const colaborador = await Colaborador.findById(id).populate('tareaId', 'nombre descripcion');
        if (!colaborador) {
            return res.status(404).json({ error: 'Colaborador no encontrado' });
        }
        res.status(200).json(colaborador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un colaborador por su ID
export const updateColaborador = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, area, tareaId } = req.body;

    try {
        let colaborador = await Colaborador.findById(id);
        if (!colaborador) {
            return res.status(404).json({ error: 'Colaborador no encontrado' });
        }

        colaborador.nombre = nombre || colaborador.nombre;
        colaborador.apellido = apellido || colaborador.apellido;
        colaborador.telefono = telefono || colaborador.telefono;
        colaborador.area = area || colaborador.area;
        colaborador.tareaId = tareaId ? (Array.isArray(tareaId) ? tareaId : [tareaId]) : colaborador.tareaId;

        await colaborador.save();

        res.status(200).json({ message: 'Colaborador actualizado exitosamente', colaborador });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un colaborador por su ID
export const deleteColaborador = async (req, res) => {
    const { id } = req.params;

    try {
        const colaborador = await Colaborador.findByIdAndDelete(id);
        if (!colaborador) {
            return res.status(404).json({ error: 'Colaborador no encontrado' });
        }
        res.status(200).json({ message: 'Colaborador eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
