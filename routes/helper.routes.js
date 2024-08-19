import e from "express";
import {uploadToCloudinary} from "../controllers/helper.controller.js";
import multer from 'multer';

const router = e.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/uploadFile', upload.fields([{ name: 'file' }, { name: 'image' }]), uploadToCloudinary);

export default router;