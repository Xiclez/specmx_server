import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dgyepdjut/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'specmx';

export const uploadToCloudinary = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = req.files.image;
        const tempFilePath = file.tempFilePath;

        const formData = new FormData();
        formData.append('file', fs.createReadStream(tempFilePath));
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        fs.unlinkSync(tempFilePath); // Eliminar el archivo temporal

        res.json({ url: response.data.secure_url });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload media to Cloudinary' });
    }
};