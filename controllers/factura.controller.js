import Factura from '../models/factura.model.js';

// Crear una nueva factura
export const createFactura = async (req, res) => {
    const { fechaEmision, monto, estado, servicioId } = req.body;

    try {
        const factura = new Factura({
            fechaEmision,
            monto,
            estado,
            servicioId
        });

        await factura.save();
        res.status(201).json({ message: 'Factura creada exitosamente', factura });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener la lista de todas las facturas
export const getFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find().populate('servicioId', 'nombre descripcion');
        res.status(200).json(facturas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una factura por su ID
export const getFacturaById = async (req, res) => {
    const { id } = req.params;

    try {
        const factura = await Factura.findById(id).populate('servicioId', 'nombre descripcion');
        if (!factura) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json(factura);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una factura por su ID
export const updateFactura = async (req, res) => {
    const { id } = req.params;
    const { fechaEmision, monto, estado, servicioId } = req.body;

    try {
        let factura = await Factura.findById(id);
        if (!factura) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }

        factura.fechaEmision = fechaEmision || factura.fechaEmision;
        factura.monto = monto || factura.monto;
        factura.estado = estado || factura.estado;
        factura.servicioId = servicioId || factura.servicioId;

        await factura.save();

        res.status(200).json({ message: 'Factura actualizada exitosamente', factura });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una factura por su ID
export const deleteFactura = async (req, res) => {
    const { id } = req.params;

    try {
        const factura = await Factura.findByIdAndDelete(id);
        if (!factura) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Factura eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
