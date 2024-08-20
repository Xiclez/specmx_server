import express from 'express';
import {
    createCliente,
    getClientes,
    getClienteById,
    updateCliente,
    deleteCliente

} from '../controllers/cliente.controller.js';

const router = express.Router();

router.post('/createCliente', createCliente);
router.get('/getClientes', getClientes);
router.get('/getCliente/:id', getClienteById);
router.put('/updateCliente/:id', updateCliente);
router.delete('/deleteCliente/:id', deleteCliente);

export default router;