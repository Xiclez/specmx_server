import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3001; // Usamos el puerto 3001 para el servidor

app.use(cors());

app.get('/api/ipc', async (req, res) => {
    try {
        const response = await fetch('https://www.bmv.com.mx/es/movil/InfoMercado');
        const text = await response.text();

        // Buscar la parte del JSON en el HTML
        const jsonStartIndex = text.indexOf('({', text.indexOf('input[name="indices"]')) + 1;
        const jsonEndIndex = text.lastIndexOf('})') + 1;

        if (jsonStartIndex === 0 || jsonEndIndex === 0) {
            throw new Error("No se pudo encontrar el JSON en la respuesta.");
        }

        const jsonString = text.slice(jsonStartIndex, jsonEndIndex);
        const data = JSON.parse(jsonString);

        const ipcData = data.response.indicesSimple.find(index => index.nombreCorto === 'S&P/BMV IPC');

        if (ipcData) {
            res.json({
                valorAcomulado: ipcData.datosEstadistica.valorAcomulado,
                variacionPorcentual: ipcData.datosEstadistica.variacionPorcentual,
                volumenOperado: ipcData.datosEstadistica.volumenOperado,
                hora: ipcData.datosEstadistica.hora
            });
        } else {
            res.status(404).json({ error: 'Datos del IPC no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
