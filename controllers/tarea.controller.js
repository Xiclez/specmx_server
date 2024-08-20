import Tarea from '../models/tarea.model.js';

// Crear una nueva tarea
export const createTarea = async (req, res) => {
    const { nombre, descripcion, fechaInicio, fechaFin, estado, proyectoId, colaboradorId } = req.body;

    try {
        const tarea = new Tarea({
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            estado,
            proyectoId,
            colaboradorId
        });

        await tarea.save();
        res.status(201).json({ message: 'Tarea creada exitosamente', tarea });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener la lista de todas las tareas
export const getTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find()
            .populate('proyectoId', 'nombre descripcion')
            .populate('colaboradorId', 'nombre apellido');
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una tarea por su ID
export const getTareaById = async (req, res) => {
    const { id } = req.params;

    try {
        const tarea = await Tarea.findById(id)
            .populate('proyectoId', 'nombre descripcion')
            .populate('colaboradorId', 'nombre apellido');
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una tarea por su ID
export const updateTarea = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fechaInicio, fechaFin, estado, proyectoId, colaboradorId } = req.body;

    try {
        let tarea = await Tarea.findById(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        tarea.nombre = nombre || tarea.nombre;
        tarea.descripcion = descripcion || tarea.descripcion;
        tarea.fechaInicio = fechaInicio || tarea.fechaInicio;
        tarea.fechaFin = fechaFin || tarea.fechaFin;
        tarea.estado = estado || tarea.estado;
        tarea.proyectoId = proyectoId || tarea.proyectoId;
        tarea.colaboradorId = colaboradorId || tarea.colaboradorId;

        await tarea.save();

        res.status(200).json({ message: 'Tarea actualizada exitosamente', tarea });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una tarea por su ID
export const deleteTarea = async (req, res) => {
    const { id } = req.params;

    try {
        const tarea = await Tarea.findByIdAndDelete(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
