import e from "express";
import {
    uploadToCloudinary,
    getCSFData
    } from "../controllers/helper.controller.js";
import multer from 'multer';

const router = e.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/uploadFile', upload.fields([{ name: 'file' }, { name: 'image' }]), uploadToCloudinary);
router.post('/uploadCSF', getCSFData);

export default router;