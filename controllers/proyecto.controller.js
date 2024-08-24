import Proyecto from '../models/proyecto.model.js';

// Crear un nuevo proyecto
export const createProyecto = async (req, res) => {
    const { nombre, descripcion, fechaInicio, fechaFin, estado, files, clienteId } = req.body;

    try {
        const proyecto = new Proyecto({
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            estado,
            files,
            clienteId
        });

        await proyecto.save();
        res.status(201).json({ message: 'Proyecto creado exitosamente', proyecto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener la lista de todos los proyectos
export const getProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find().populate('clienteId', 'nombre direccion');
        res.status(200).json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un proyecto por su ID
export const getProyectoById = async (req, res) => {
    const { id } = req.params;

    try {
        const proyecto = await Proyecto.findById(id).populate('clienteId', 'nombre direccion');
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.status(200).json(proyecto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un proyecto por su ID
export const updateProyecto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fechaInicio, fechaFin, estado, files, clienteId } = req.body;

    try {
        let proyecto = await Proyecto.findById(id);
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        proyecto.nombre = nombre || proyecto.nombre;
        proyecto.descripcion = descripcion || proyecto.descripcion;
        proyecto.fechaInicio = fechaInicio || proyecto.fechaInicio;
        proyecto.fechaFin = fechaFin || proyecto.fechaFin;
        proyecto.estado = estado || proyecto.estado;
        proyecto.files = files || proyecto.files;
        proyecto.clienteId = clienteId || proyecto.clienteId;

        await proyecto.save();

        res.status(200).json({ message: 'Proyecto actualizado exitosamente', proyecto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un proyecto por su ID
export const deleteProyecto = async (req, res) => {
    const { id } = req.params;

    try {
        const proyecto = await Proyecto.findByIdAndDelete(id);
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
