import express from 'express';
import {
    createEmpresa,
    getEmpresas,
    getEmpresaById,
    updateEmpresa,
    deleteEmpresa

} from '../controllers/empresa.controller.js';

const router = express.Router();

router.post('/createEmpresa', createEmpresa);
router.get('/getEmpresas', getEmpresas);
router.get('/getEmpresa/:id', getEmpresaById);
router.put('/updateEmpresa/:id', updateEmpresa);
router.delete('/deleteEmpresa/:id', deleteEmpresa);

export default router;