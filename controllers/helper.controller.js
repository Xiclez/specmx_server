import fs from 'fs';
import cloudinary from 'cloudinary';
import axios from 'axios';
import cheerio from 'cheerio';


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

const formatDateToYMD = (date) => {
    if (!date) return null;
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
};

export const getCSFData = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send('URL no proporcionada');
    }

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const datosIdentificacion = {};
        const datosUbicacion = {};
        let caracteristicasFiscales = [];

        // Extracción del RFC
        const rfcText = $('li').filter((i, el) => $(el).text().includes('El RFC:')).text().trim();
        const rfcMatch = rfcText.match(/RFC:\s*([A-Z0-9]+)/);
        if (rfcMatch && rfcMatch[1]) {
            datosIdentificacion.RFC = rfcMatch[1];
        }

        // Datos de Identificación
        $('#ubicacionForm\\:j_idt13\\:0\\:j_idt15 table tbody tr, #ubicacionForm\\:j_idt15\\:0\\:j_idt16 table tbody tr').each((i, elem) => {
            const key = $(elem).find('td').first().text().trim();
            const value = $(elem).find('td').last().text().trim();
            if (key.includes('CURP')) datosIdentificacion.CURP = value;
            if (key.includes('Nombre')) datosIdentificacion.Nombre = value;
            if (key.includes('Apellido Paterno')) datosIdentificacion.ApellidoPaterno = value;
            if (key.includes('Apellido Materno')) datosIdentificacion.ApellidoMaterno = value;
            if (key.includes('Fecha Nacimiento')) datosIdentificacion.FechaNacimiento = formatDateToYMD(value);
            if (key.includes('Fecha de Inicio de operaciones')) datosIdentificacion.FechaInicioOperaciones = formatDateToYMD(value);
            if (key.includes('Situación del contribuyente')) datosIdentificacion.SituacionContribuyente = value;
            if (key.includes('Fecha del último cambio de situación')) datosIdentificacion.FechaUltimoCambioSituacion = formatDateToYMD(value);
            if (key.includes('Denominación o Razón Social')) datosIdentificacion.DenominacionRazonSocial = value;
            if (key.includes('Régimen de capital')) datosIdentificacion.RegimenCapital = value;
            if (key.includes('Fecha de constitución')) datosIdentificacion.FechaConstitucion = formatDateToYMD(value);
        });

        // Datos de Ubicación
        $('#ubicacionForm\\:j_idt13\\:1\\:j_idt15 table tbody tr').each((i, elem) => {
            const key = $(elem).find('td').first().text().trim();
            const value = $(elem).find('td').last().text().trim();
            if (key.includes('Entidad Federativa')) datosUbicacion.EntidadFederativa = value;
            if (key.includes('Municipio o delegación')) datosUbicacion.MunicipioDelegacion = value;
            if (key.includes('Colonia')) datosUbicacion.Colonia = value;
            if (key.includes('Tipo de vialidad')) datosUbicacion.TipoVialidad = value;
            if (key.includes('Nombre de la vialidad')) datosUbicacion.NombreVialidad = value;
            if (key.includes('Número exterior')) datosUbicacion.NumeroExterior = value;
            if (key.includes('Número interior')) datosUbicacion.NumeroInterior = value;
            if (key.includes('CP')) datosUbicacion.CP = value;
            if (key.includes('Correo electrónico')) datosUbicacion.CorreoElectronico = value;
            if (key.includes('AL')) datosUbicacion.AL = value;
        });

        // Características fiscales
        $('#ubicacionForm\\:j_idt13\\:2\\:j_idt15 table tbody tr').each((i, elem) => {
            const key = $(elem).find('td').first().text().trim();
            const value = $(elem).find('td').last().text().trim();
            if (key.includes('Régimen')) {
                const regimen = {
                    Regimen: value,
                    FechaAlta: ''
                };
                const nextRow = $(elem).next();
                if (nextRow.length) {
                    const nextKey = nextRow.find('td').first().text().trim();
                    if (nextKey.includes('Fecha de alta')) {
                        regimen.FechaAlta = formatDateToYMD(nextRow.find('td').last().text().trim());
                    }
                }
                caracteristicasFiscales.push(regimen);
            }
        });

        // Filtrar características fiscales para eliminar objetos con campos vacíos
        caracteristicasFiscales = caracteristicasFiscales.filter(item => item.Regimen && item.FechaAlta);

        res.json({
            Nombre: datosIdentificacion.Nombre,
            ApellidoPaterno: datosIdentificacion.ApellidoPaterno,
            ApellidoMaterno: datosIdentificacion.ApellidoMaterno || null,
            FechaNacimiento: datosIdentificacion.FechaNacimiento || null,
            DenominacionRazonSocial: datosIdentificacion.DenominacionRazonSocial,
            RegimenCapital: datosIdentificacion.RegimenCapital,
            FechaConstitucion: datosIdentificacion.FechaConstitucion || null,
            EntidadFederativa: datosUbicacion.EntidadFederativa,
            MunicipioDelegacion: datosUbicacion.MunicipioDelegacion,
            Colonia: datosUbicacion.Colonia,
            NombreVialidad: datosUbicacion.NombreVialidad,
            NumeroExterior: datosUbicacion.NumeroExterior,
            NumeroInterior: datosUbicacion.NumeroInterior || null,
            CP: datosUbicacion.CP,
            CURP: datosIdentificacion.CURP || null,
            RFC: datosIdentificacion.RFC
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta');
    }
};

