import fetch from 'node-fetch';
import axios from 'axios';
import https from 'https';
import cheerio from 'cheerio';



export async function getIpcData(req, res) {
    try {
        const response = await fetch('https://www.bmv.com.mx/es/movil/InfoMercado');
        const text = await response.text();

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
}
export const getINPCData = async (req, res) => {
    try {
        const response = await axios.get('https://www.inegi.org.mx/app/tabulados/serviciocuadros/wsDataService.svc/listaindicador/583731/false/0700/es/json/2023/2024');
        const data = response.data;

        const serie = data[0].Data[0].Serie.Obs;
        const metaData = data[0].Data[0].MetaData;

        const values = serie.map(obs => parseFloat(obs.CurrentValue));
        const labels = serie.map(obs => obs.TimePeriod);

        const title = metaData.Name;
        const lastUpdate = metaData.LastUpdate;

        res.json({
            value: values[values.length - 1],
            labels: labels,
            values: values,
            lastUpdate: lastUpdate,
            title: title
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching INPC data: ' + error.message });
    }
};

export const getDOFUSDData = async (req, res) => {
    const { startDate, endDate } = req.body;
    let formattedStartDate, formattedEndDate;

    if (!startDate || !endDate) {
        const today = new Date().toISOString().split('T')[0].split('-').reverse().join('/');
        formattedStartDate = formattedEndDate = today;
    } else {
        formattedStartDate = startDate.split('-').reverse().join('/');
        formattedEndDate = endDate.split('-').reverse().join('/');
    }

    try {
        const response = await axios.get(`https://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&dfecha=${formattedStartDate}&hfecha=${formattedEndDate}`, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        const html = response.data;
        const $ = cheerio.load(html);

        const table = $('table.Tabla_borde');
        if (table.length > 0) {
            const rows = table.find('tr');
            const results = [];

            rows.each((index, row) => {
                if (index === 0) return; 
                const cells = $(row).find('td');
                const fecha = $(cells[0]).text().trim();
                const valor = $(cells[1]).text().trim();

                results.push({ fecha, valor });
            });

            res.json(results);
        } else {
            res.status(500).json({ error: 'Error fetching USD data from DOF: table is null' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching USD data from DOF: ' + error.message });
    }
};