import Cliente from '../models/cliente.model.js';

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    const { Nombre, 
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
            email, 
            CURP, 
            RFC, 
            profilePhoto, 
            files, 
            empresaId } = req.body;

    try {
        const existingCliente = await Cliente.findOne({ email });
        if (existingCliente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado para otro cliente' });
        }

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
            email,
            CURP,
            RFC,
            profilePhoto,
            files,
            empresaId
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
        const clientes = await Cliente.find().populate('empresaId', 'nombre razonSocial'); // Populate para mostrar detalles de la empresa
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un cliente por su ID
export const getClienteById = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findById(id).populate('empresaId', 'nombre razonSocial'); // Populate para mostrar detalles de la empresa
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
    const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, EntidadFederativa, MunicipioDelegacion,Colonia,NombreVialidad,NumeroExterior,NumeroInterior,CP, telefono, email, CURP, RFC, profilePhoto, files, empresaId } = req.body;

    try {
        let cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        cliente.nombre = nombre || cliente.nombre;
        cliente.apellidoPaterno = apellidoPaterno || cliente.apellidoPaterno;
        cliente.apellidoMaterno = apellidoMaterno || cliente.apellidoMaterno;
        cliente.fechaNacimiento = fechaNacimiento || cliente.fechaNacimiento;
        cliente.EntidadFederativa = EntidadFederativa || cliente.EntidadFederativa;
        cliente.MunicipioDelegacion = MunicipioDelegacion || cliente.MunicipioDelegacion;
        cliente.Colonia = Colonia || cliente.Colonia;
        cliente.NombreVialidad = NombreVialidad || cliente.NombreVialidad;
        cliente.NumeroExterior = NumeroExterior || cliente.NumeroExterior;
        cliente.NumeroInterior = NumeroInterior || cliente.NumeroInterior;
        cliente.CP = CP || cliente.CP;
        cliente.telefono = telefono || cliente.telefono;
        cliente.email = email || cliente.email;
        cliente.CURP = CURP || cliente.CURP;
        cliente.RFC = RFC || cliente.RFC;
        cliente.profilePhoto = profilePhoto || cliente.profilePhoto;
        cliente.files = files || cliente.files;
        cliente.empresaId = empresaId || cliente.empresaId;

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
