import Cliente from '../models/cliente.model.js';

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    const { Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, EntidadFederativa, MunicipioDelegacion, Colonia, NombreVialidad, NumeroExterior, NumeroInterior, CP, telefono, CURP, RFC, files, empresaId } = req.body;

    try {
        const cliente = new Cliente({
            Nombre,
            ApellidoPaterno,
            ApellidoMaterno,
            FechaNacimiento,
            EntidadFederativa,
            MunicipioDelegacion,
            Colonia,
            NombreVialidad,
            NumeroExterior,
            NumeroInterior,
            CP,
            telefono,
            CURP,
            RFC,
            files,
            empresaId: Array.isArray(empresaId) ? empresaId : (empresaId ? [empresaId] : [])
        });

        await cliente.save();
        res.status(201).json({ message: 'Cliente creado exitosamente', cliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener la lista de todos los clientes
export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find().populate('empresaId', 'DenominacionRazonSocial');
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un cliente por su ID
export const getClienteById = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findById(id).populate('empresaId', 'DenominacionRazonSocial');
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un cliente por su ID
export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, EntidadFederativa, MunicipioDelegacion, Colonia, NombreVialidad, NumeroExterior, NumeroInterior, CP, telefono, CURP, RFC, files, empresaId } = req.body;

    try {
        let cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        cliente.Nombre = Nombre || cliente.Nombre;
        cliente.ApellidoPaterno = ApellidoPaterno || cliente.ApellidoPaterno;
        cliente.ApellidoMaterno = ApellidoMaterno || cliente.ApellidoMaterno;
        cliente.FechaNacimiento = FechaNacimiento || cliente.FechaNacimiento;
        cliente.EntidadFederativa = EntidadFederativa || cliente.EntidadFederativa;
        cliente.MunicipioDelegacion = MunicipioDelegacion || cliente.MunicipioDelegacion;
        cliente.Colonia = Colonia || cliente.Colonia;
        cliente.NombreVialidad = NombreVialidad || cliente.NombreVialidad;
        cliente.NumeroExterior = NumeroExterior || cliente.NumeroExterior;
        cliente.NumeroInterior = NumeroInterior || cliente.NumeroInterior;
        cliente.CP = CP || cliente.CP;
        cliente.telefono = telefono || cliente.telefono;
        cliente.CURP = CURP || cliente.CURP;
        cliente.RFC = RFC || cliente.RFC;

        // Si se proporcionan nuevos archivos, agrégalos al array existente
        if (files && files.length > 0) {
            cliente.files = [...cliente.files, ...files];
        }

        // Si se proporcionan nuevos empresaId, agrégalos al array existente evitando duplicados
        if (empresaId && empresaId.length > 0) {
            const newEmpresaIds = Array.isArray(empresaId) ? empresaId : [empresaId];
            cliente.empresaId = [...new Set([...cliente.empresaId.map(id => id.toString()), ...newEmpresaIds.map(id => id.toString())])];
        }

        await cliente.save();

        res.status(200).json({ message: 'Cliente actualizado exitosamente', cliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un cliente por su ID
export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByIdAndDelete(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
