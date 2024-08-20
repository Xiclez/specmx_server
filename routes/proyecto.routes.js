import express from 'express';
import {
    createProyecto,
    getProyectos,
    getProyectoById,
    updateProyecto,
    deleteProyecto
} from '../controllers/proyecto.controller.js';

const router = express.Router();

router.post('/createProyecto', createProyecto);
router.get('/getProyectos', getProyectos);
router.get('/getProyecto/:id', getProyectoById);
router.put('/updateProyecto/:id', updateProyecto);
router.delete('/deleteProyecto/:id', deleteProyecto);

export default router;
