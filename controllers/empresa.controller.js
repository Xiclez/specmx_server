import Empresa from '../models/empresa.model.js';

// Crear una nueva empresa
export const createEmpresa = async (req, res) => {
    const {
        nombre,
        DenominacionRazonSocial,
        RegimenCapital,
        FechaConstitucion,
        EntidadFederativa,
        MunicipioDelegacion,
        Colonia,
        NombreVialidad,
        NumeroExterior,
        NumeroInterior,
        CP,
        telefono,
        email,
        RFC,
        sector
    } = req.body;

    try {
        const existingEmpresa = await Empresa.findOne({ email });
        if (existingEmpresa) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado para otra empresa' });
        }

        const empresa = new Empresa({
            nombre,
            DenominacionRazonSocial,
            RegimenCapital,
            FechaConstitucion,
            EntidadFederativa,
            MunicipioDelegacion,
            Colonia,
            NombreVialidad,
            NumeroExterior,
            NumeroInterior,
            CP,
            telefono,
            email,
            RFC,
            sector
        });

        await empresa.save();
        res.status(201).json({ message: 'Empresa creada exitosamente', empresa });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener la lista de todas las empresas
export const getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una empresa por su ID
export const getEmpresaById = async (req, res) => {
    const { id } = req.params;

    try {
        const empresa = await Empresa.findById(id);
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una empresa por su ID
export const updateEmpresa = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        DenominacionRazonSocial,
        RegimenCapital,
        FechaConstitucion,
        EntidadFederativa,
        MunicipioDelegacion,
        Colonia,
        NombreVialidad,
        NumeroExterior,
        NumeroInterior,
        CP, 
        telefono,
        email,
        RFC,
        sector
    } = req.body;

    try {
        let empresa = await Empresa.findById(id);
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }

        empresa.nombre = nombre || empresa.nombre;
        empresa.DenominacionRazonSocial = DenominacionRazonSocial || empresa.DenominacionRazonSocial;
        empresa.RegimenCapital = RegimenCapital || empresa.RegimenCapital;
        empresa.FechaConstitucion = FechaConstitucion || empresa.FechaConstitucion;
        empresa.EntidadFederativa = EntidadFederativa || empresa.EntidadFederativa;
        empresa.MunicipioDelegacion = MunicipioDelegacion || empresa.MunicipioDelegacion;
        empresa.Colonia = Colonia || empresa.Colonia;
        empresa.NombreVialidad = NombreVialidad || empresa.NombreVialidad;
        empresa.NumeroExterior = NumeroExterior || empresa.NumeroExterior;
        empresa.NumeroInterior = NumeroInterior || empresa.NumeroInterior;
        empresa.CP = CP || empresa.CP;
        empresa.telefono = telefono || empresa.telefono;
        empresa.email = email || empresa.email;
        empresa.RFC = RFC || empresa.RFC;
        empresa.sector = sector || empresa.sector;

        await empresa.save();

        res.status(200).json({ message: 'Empresa actualizada exitosamente', empresa });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una empresa por su ID
export const deleteEmpresa = async (req, res) => {
    const { id } = req.params;

    try {
        const empresa = await Empresa.findByIdAndDelete(id);
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.status(200).json({ message: 'Empresa eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};