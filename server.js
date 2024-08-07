import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import connectDB from './db.js'
import indicatorsRouter from './routes/indicators.routes.js'; 
import blogRouter from './routes/blog.routes.js'
import authRouter from './routes/auth.routes.js'

dotenv.config();
connectDB();

const SECRET_KEY = process.env.SECRET_KEY;
const app = express();
const port = 3005; // Usamos el puerto 3001 para el servidor


app.use(cors());
app.use(express.json());
app.use('/api/indicators', indicatorsRouter);
app.use('/api/blog',blogRouter)
app.use('/api/auth',authRouter)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
