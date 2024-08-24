import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import indicatorsRouter from './routes/indicators.routes.js'; 
import blogRouter from './routes/blog.routes.js';
import authRouter from './routes/auth.routes.js';
import clienteRouter from './routes/cliente.routes.js';
import colaboradorRouter from './routes/colaborador.routes.js';
import empresaRouter from './routes/empresa.routes.js';
import facturaRouter from './routes/factura.routes.js';
import proyectoRouter from './routes/proyecto.routes.js';
import tareaRouter from './routes/tarea.routes.js';
import usuarioRouter from './routes/usuario.routes.js';
import servicioRouter from './routes/servicio.routes.js';
import helperRouter from './routes/helper.routes.js';

dotenv.config();
connectDB();

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Use Multer for file uploads in helperRouter
app.use('/api/indicators', indicatorsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/auth', authRouter);
app.use('/api/cliente', clienteRouter);
app.use('/api/colaborador', colaboradorRouter);
app.use('/api/empresa', empresaRouter);
app.use('/api/factura', facturaRouter);
app.use('/api/proyecto', proyectoRouter);
app.use('/api/tarea', tareaRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/servicio', servicioRouter);
app.use('/api/helper', helperRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
