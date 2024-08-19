import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import connectDB from './db.js';
import indicatorsRouter from './routes/indicators.routes.js'; 
import blogRouter from './routes/blog.routes.js';
import authRouter from './routes/auth.routes.js';
import clientRouter from './routes/client.routes.js';
import helperRouter from './routes/helper.routes.js';
import orderRouter from './routes/order.routes.js';

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
app.use('/api/client', clientRouter);
app.use('/api/helper', helperRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
