import express from 'express';
import {
    createFactura,
    getFacturas,
    getFacturaById,
    updateFactura,
    deleteFactura

} from '../controllers/factura.controller.js';

const router = express.Router();

router.post('/createFactura', createFactura);
router.get('/getFacturas', getFacturas);
router.get('/getFactura/:id', getFacturaById);
router.put('/updateFactura/:id', updateFactura);
router.delete('/deleteFactura/:id', deleteFactura);

export default router;
