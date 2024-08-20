import express from 'express';
import {
    createTarea,
    getTareas,
    getTareaById,
    updateTarea,
    deleteTarea
} from '../controllers/tarea.controller.js';

const router = express.Router();

router.post('/createTarea', createTarea);
router.get('/getTareas', getTareas);
router.get('/getTarea/:id', getTareaById);
router.put('/updateTarea/:id', updateTarea);
router.delete('/deleteTarea/:id', deleteTarea);

export default router;
