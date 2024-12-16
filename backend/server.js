import {LGDData} from "./LGDData.js";
import { cPDDataYear } from "./PDYearlyData.js";
import { mPDDataYear } from "./PDYearlyData.js";
import { mPDQuarterlyData } from "./PDQData.js";
import { cPDQuarterlyData } from "./PDQData.js";
import {GBVData} from "./GBVChartData.js"
import {GBVStageData} from "./GBVStageData.js"
import {RiskMetricData} from "./RiskMetricData.js"
import {CreditListData} from "./CreditListData.js"
import { ProfileReportsData } from "./ProfileReportsData.js";
import { ECLData1,ECLData2 } from "./ECLData.js";
import express from 'express';
import cors from 'cors';

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

app.get('/cpdyears', (req, res) => {
  res.json(cPDDataYear);
});
app.get('/mpdyears', (req, res) => {
  res.json(mPDDataYear);
});

app.get('/cpdqdata', (req, res) => {
  res.json(cPDQuarterlyData); 
});
app.get('/mpdqdata', (req, res) => {
  res.json(mPDQuarterlyData);
});
app.get('/ecldata1', (req, res) => {
  res.json(ECLData1);
});
app.get('/ecldata2', (req, res) => {
  res.json(ECLData2);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
