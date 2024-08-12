import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import connectDB from './db.js'
import indicatorsRouter from './routes/indicators.routes.js'; 
import blogRouter from './routes/blog.routes.js'
import authRouter from './routes/auth.routes.js'
import clientRouter from './routes/client.routes.js';
import helperRouter from './routes/helper.routes.js';

dotenv.config();
connectDB();

const SECRET_KEY = process.env.SECRET_KEY;
const app = express();
const port = 3010; 


app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/indicators', indicatorsRouter);
app.use('/api/blog',blogRouter)
app.use('/api/auth',authRouter)
app.use('/api/client',clientRouter)
app.use('/api/helper',helperRouter)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
