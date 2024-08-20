import express from 'express';
import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/usuario.controller.js';

const router = express.Router();

router.get('/getUsuarios', getUsers);
router.get('/getUsuario/:id', getUserById);
router.put('/updateUsuario/:id', updateUser);
router.delete('/deleteUsuario/:id', deleteUser);

export default router;
