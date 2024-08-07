import express from 'express';
import { 
    getIpcData, 
    getDOFUSDData,
    getINPCData


} from '../controllers/indicators.controller.js';

const router = express.Router();

router.get('/ipc', getIpcData);
router.get('/dof-usd',getDOFUSDData)
router.get('/inpc',getINPCData)

export default router;
