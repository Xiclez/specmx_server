import Servicio from '../models/servicio.model.js';

// Crear un nuevo servicio
export const createServicio = async (req, res) => {
    const { nombre, descripcion, precio, tipoServicio, facturaId } = req.body;

    try {
        const servicio = new Servicio({
            nombre,
            descripcion,
            precio,
            tipoServicio,
            facturaId: Array.isArray(facturaId) ? facturaId : (facturaId ? [facturaId] : [])
        });

        await servicio.save();
        res.status(201).json({ message: 'Servicio creado exitosamente', servicio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener la lista de todos los servicios
export const getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find().populate('facturaId', 'folio total');
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un servicio por su ID
export const getServicioById = async (req, res) => {
    const { id } = req.params;

    try {
        const servicio = await Servicio.findById(id).populate('facturaId', 'folio total');
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json(servicio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un servicio por su ID
export const updateServicio = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, tipoServicio, facturaId } = req.body;

    try {
        let servicio = await Servicio.findById(id);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        servicio.nombre = nombre || servicio.nombre;
        servicio.descripcion = descripcion || servicio.descripcion;
        servicio.precio = precio || servicio.precio;
        servicio.tipoServicio = tipoServicio || servicio.tipoServicio;
        servicio.facturaId = facturaId ? (Array.isArray(facturaId) ? facturaId : [facturaId]) : servicio.facturaId;

        await servicio.save();

        res.status(200).json({ message: 'Servicio actualizado exitosamente', servicio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un servicio por su ID
export const deleteServicio = async (req, res) => {
    const { id } = req.params;

    try {
        const servicio = await Servicio.findByIdAndDelete(id);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json({ message: 'Servicio eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
