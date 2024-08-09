import Cliente from '../models/client.model.js';
import axios from 'axios';
import cheerio from 'cheerio';

// Crear un nuevo cliente
export const createClient = async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = new Cliente(clientData);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el cliente');
    }
};

// Obtener todos los clientes
export const getClients = async (req, res) => {
    try {
        const clients = await Cliente.find();
        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los clientes');
    }
};

// Obtener un cliente por ID
export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Cliente.findById(id);
        if (!client) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el cliente');
    }
};

// Actualizar un cliente por ID
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const clientData = req.body;
        const updatedClient = await Cliente.findByIdAndUpdate(id, clientData, { new: true });
        if (!updatedClient) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(updatedClient);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el cliente');
    }
};

// Eliminar un cliente por ID
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await Cliente.findByIdAndDelete(id);
        if (!deletedClient) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(deletedClient);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el cliente');
    }
};

// Obtener datos del cliente desde un URL escaneado (QR)
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
        const caracteristicasFiscales = [];

        // Datos de Identificación
        $('#ubicacionForm\\:j_idt13\\:0\\:j_idt15 table tbody tr, #ubicacionForm\\:j_idt15\\:0\\:j_idt16 table tbody tr').each((i, elem) => {
            const key = $(elem).find('td').first().text().trim();
            const value = $(elem).find('td').last().text().trim();
            if (key.includes('CURP')) datosIdentificacion.CURP = value;
            if (key.includes('Nombre')) datosIdentificacion.Nombre = value;
            if (key.includes('Apellido Paterno')) datosIdentificacion.ApellidoPaterno = value;
            if (key.includes('Apellido Materno')) datosIdentificacion.ApellidoMaterno = value;
            if (key.includes('Fecha Nacimiento')) datosIdentificacion.FechaNacimiento = value;
            if (key.includes('Fecha de Inicio de operaciones')) datosIdentificacion.FechaInicioOperaciones = value;
            if (key.includes('Situación del contribuyente')) datosIdentificacion.SituacionContribuyente = value;
            if (key.includes('Fecha del último cambio de situación')) datosIdentificacion.FechaUltimoCambioSituacion = value;
            if (key.includes('Denominación o Razón Social')) datosIdentificacion.DenominacionRazonSocial = value;
            if (key.includes('Régimen de capital')) datosIdentificacion.RegimenCapital = value;
            if (key.includes('Fecha de constitución')) datosIdentificacion.FechaConstitucion = value;
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
                        regimen.FechaAlta = nextRow.find('td').last().text().trim();
                    }
                }
                caracteristicasFiscales.push(regimen);
            }
        });

        res.json({
            datosIdentificacion,
            datosUbicacion,
            caracteristicasFiscales
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta');
    }
};
