import fs from 'fs';
import cloudinary from 'cloudinary';

// Configuración de Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Función para subir un archivo a Cloudinary usando Multer
export const uploadToCloudinary = async (req, res) => {
    try {
        // Primero verifica si el campo 'image' está presente para la foto de perfil
        const file = req.files.image ? req.files.image[0] : req.files.file[0];

        if (!file || !file.path) {
            return res.status(400).json({ error: 'No se encontró el archivo en la solicitud' });
        }

        const filePath = file.path; // Este campo es llenado por Multer

        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: 'specmx', // Ajusta el nombre de la carpeta en Cloudinary
            resource_type: 'auto', // Para manejar diferentes tipos de archivos
        });

        // Elimina el archivo temporal después de subir a Cloudinary
        fs.unlinkSync(filePath);

        res.json({ url: result.secure_url });
    } catch (error) {
        console.error('Error subiendo a Cloudinary:', error);
        res.status(500).json({ error: 'No se pudo subir el archivo a Cloudinary' });
    }
};
