import express from 'express';
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from '../controllers/order.controller.js';

const router = express.Router();

router.get('/getOrders', getOrders);
router.get('/getOrder/:id', getOrderById);
router.post('/createOrder', createOrder);
router.put('/updateOrder/:id', updateOrder);
router.delete('/deleteOrder/:id', deleteOrder);

export default router;