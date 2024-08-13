import Order from '../models/order.model.js';
import axios from 'axios';

// Crear una nueva orden
export const createOrder = async (req, res) => {
    try {
        const { clientId, collaboratorId, title, description } = req.body;

        const newOrder = new Order({
            clientId,
            collaboratorId,
            title,
            description
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la orden', error: err.message });
    }
};

// Obtener todas las órdenes
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('clientId collaboratorId');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las órdenes', error: err.message });
    }
};

// Obtener una orden por ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('clientId collaboratorId');
        if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener la orden', error: err.message });
    }
};

// Actualizar una orden
export const updateOrder = async (req, res) => {
    try {
        const { title, description, status, progress } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            title,
            description,
            status,
            progress
        }, { new: true });

        if (!updatedOrder) return res.status(404).json({ message: 'Orden no encontrada' });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar la orden', error: err.message });
    }
};

// Eliminar una orden
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Orden no encontrada' });
        res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar la orden', error: err.message });
    }
};

// Añadir un log a una orden
export const addLogToOrder = async (req, res) => {
    try {
        const { comment, files } = req.body;
        const log = {
            user: req.user.id, // Supone que la autenticación ya está configurada
            comment,
            files: []
        };

        // Manejar la subida de archivos usando el endpoint externo
        if (files && files.length > 0) {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post(`${process.env.API_URL}/api/helper/uploadFile`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.url) {
                    log.files.push(response.data.url); // Asegúrate de que el endpoint devuelva una URL
                }
            }
        }

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

        order.logs.push(log);
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Error al añadir el log', error: err.message });
    }
};
