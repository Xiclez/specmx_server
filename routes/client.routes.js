import express from 'express';
import { 
    getCSFData,
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} from '../controllers/client.controller.js';

const router = express.Router();

router.post('/csf', getCSFData);
router.get('/getClients', getClients);
router.get('/getClient/:id', getClientById);
router.post('/createClient', createClient);
router.put('/updateClient/:id', updateClient);
router.delete('/deleteClient/:id', deleteClient);

export default router;