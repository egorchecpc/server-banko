import {LGDData} from "./LGDData.js";
import { cPDDataYear2 } from "./PDYearlyData.js";
import { cPDQuarterlyData } from "./PDQData.js";
import {PDForecastData} from "./PDForecastData.js"
import {GBVData} from "./GBVChartData.js"
import {GBVStageData} from "./GBVStageData.js"
import {RiskMetricData} from "./RiskMetricData.js"
import {CreditListData} from "./CreditListData.js"
import { ProfileReportsData } from "./ProfileReportsData.js";
import { ECLData1,ECLData2 } from "./ECLData.js";
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(cors());


app.get('/lgddata', (req, res) => {
    res.json(LGDData);
});

app.get('/gbvdata', (req, res) => {
  res.json(GBVData);
});

app.get('/gbvstagedata', (req, res) => {
  res.json(GBVStageData);
});

app.get('/riskmetricdata', (req, res) => {
  res.json(RiskMetricData);
});

app.get('/creditlistdata', (req, res) => {
  res.json(CreditListData);
});

app.get('/profilereportsdata', (req, res) => {
  res.json(ProfileReportsData);
});

app.get('/probabilityDefault/yearly', (req, res) => {
  res.json(cPDDataYear2);
});

app.get('/probabilityDefault/quarterly', (req, res) => {
  res.json(cPDQuarterlyData); 
});

app.get('/probabilityDefault/forecast', (req, res) => {
  res.json(PDForecastData);
});
app.get('/ecldata1', (req, res) => {
  res.json(ECLData1);
});
app.get('/ecldata2', (req, res) => {
  res.json(ECLData2);
});

app.use(bodyParser.json());

app.post('/macro', (req, res) => {
  const macroData = req.body;
  console.log('Полученные макроданные:', macroData);

  res.status(200).json({ message: 'Макроданные успешно получены', data: macroData });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
