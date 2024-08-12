import e from "express";
import {uploadToCloudinary} from "../controllers/helper.controller.js";

const router = e.Router();
router.post('/uploadFile', uploadToCloudinary);

export default router;