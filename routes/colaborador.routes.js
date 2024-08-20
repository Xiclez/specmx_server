import express from 'express';
import {
    createColaborador,
    getColaboradores,
    getColaboradorById,
    updateColaborador,
    deleteColaborador

} from '../controllers/colaborador.controller.js';

const router = express.Router();

router.post('/createColaborador', createColaborador);
router.get('/getColaboradores', getColaboradores);
router.get('/getColaborador/:id', getColaboradorById);
router.put('/updateColaborador/:id', updateColaborador);
router.delete('/deleteColaborador/:id', deleteColaborador);

export default router;