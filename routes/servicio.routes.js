import express from 'express';
import {
    createServicio,
    getServicios,
    getServicioById,
    updateServicio,
    deleteServicio
} from '../controllers/servicio.controller.js';

const router = express.Router();

router.post('/createServicio', createServicio);
router.get('/getServicios', getServicios);
router.get('/getServicio/:id', getServicioById);
router.put('/updateServicio/:id', updateServicio);
router.delete('/deleteServicio/:id', deleteServicio);

export default router;
