import {LGDData} from "./LGDData.js";
import { cPDDataYear2 } from "./PDYearlyData.js";
import { cPDQuarterlyData } from "./PDQData.js";
import {PDForecastData} from "./PDForecastData.js"
import {GBVData} from "./GBVChartData.js"
import {GBVStageData} from "./GBVStageData.js"
import {CreditListData} from "./CreditListData.js"
import { ProfileReportsData } from "./ProfileReportsData.js";
import { ECLData1,ECLData2 } from "./ECLData.js";
import {test} from './VBSOKU.js '
import {chart4} from './chart4.js'
import {heatmapData} from './heatmap.js'
import { amountChart, amountChartP } from "./AmountChart.js";
import { ageingAmount, ageingCount } from "./AgeingAmount.js";
import {profile} from "./ProfileData.js"
import {templates} from "./TemplatesData.js"
import { KPI_DATA } from "./KPIData.js";
import {RISK_GROUP_DATA} from "./RiskGroupData.js"
import { barData, barDataCount } from "./CategoryChart.js";
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
const SECRET_KEY = 'your-secret-key' // В реальном приложении используйте переменные окружения

// Захардкоженные учетные данные (в реальном приложении используйте базу данных)
const VALID_CREDENTIALS = {
  email: 'admin@stacklevel.group',
  password: 'softclubdisraption'
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '24h' })
    res.json({ token })
  } else {
    res.status(401).json({ error: 'Неверные учетные данные' })
  }
})

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'Требуется авторизация' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Недействительный токен' })
  }
}

// Пример защищенного маршрута
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Это защищенный маршрут' })
})

app.get('/lgddata', (req, res) => {
    res.json(LGDData);
});

app.get('/gbvdata', (req, res) => {
  res.json(GBVData);
});

app.get('/gbvstagedata', (req, res) => {
  res.json(GBVStageData);
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

app.get('/vbs', (req, res) => {
  res.json(test);
});

app.get('/chart4', (req, res) => {
  res.json(chart4);
});

app.get('/kpi', (req, res) => {
  res.json(KPI_DATA);
});

app.get('/risk-group', (req, res) => {
  res.json(RISK_GROUP_DATA);
});

app.get('/heatmap', (req, res) => {
  res.json(heatmapData);
});

app.get('/category-chart', (req, res) => {
  res.json(barData);
});

app.get('/amount-chart', (req, res) => {
  res.json(amountChart);
});

app.get('/amount-chart-p', (req, res) => {
  res.json(amountChartP);
});

app.get('/ageing-amount-chart', (req, res) => {
  res.json(ageingAmount);
});

app.get('/ageing-count-chart', (req, res) => {
  res.json(ageingCount);
});

app.get('/category-amount-chart', (req, res) => {
  res.json(barData);
});

app.get('/category-count-chart', (req, res) => {
  res.json(barDataCount);
});

app.get('/profile', (req, res) => {
  res.json(profile)
})

app.put('/profile', (req, res) => {
  const updatedProfile = req.body;

  if (!updatedProfile || typeof updatedProfile !== 'object') {
    return res.status(400).json({ error: 'Некорректные данные профиля' });
  }

  const allowedKeys = ['name', 'position', 'email', 'reportsCount', 'avatar'];
  const hasValidKeys = Object.keys(updatedProfile).some((key) =>
    allowedKeys.includes(key)
  );

  if (!hasValidKeys) {
    return res.status(400).json({
      error: 'Тело запроса не содержит допустимых полей для обновления',
    });
  }

  Object.keys(updatedProfile).forEach((key) => {
    if (allowedKeys.includes(key)) {
      profile[key] = updatedProfile[key];
    }
  });

  res.json(profile);
});



app.get('/templates', (req, res) => {
  res.json(templates)
})

app.put('/templates/:id', (req, res) => {
  const { id } = req.params;
  const updatedTemplate = req.body;
  const templateIndex = templates.findIndex((template) => template.id === id);

  if (templateIndex === -1) {
    templates.push(updatedTemplate);
    return res.status(201).json(templates);
  }
  templates[templateIndex] = { ...templates[templateIndex], ...updatedTemplate };

  res.json(templates[templateIndex]);
});

app.delete('/templates/:id', (req, res) => {
  const { id } = req.params;
  const templateIndex = templates.findIndex((template) => template.id === id);
  
  if (templateIndex === -1) {
    return res.status(404).json({ error: 'Template not found' });
  }
  
  templates.splice(templateIndex, 1);
  res.json({ success: true });
});

app.post('/macro', (req, res) => {
  const macroData = req.body;
  console.log('Полученные макроданные:', macroData);

  res.status(200).json({ message: 'Макроданные успешно получены', data: macroData });
});

app.post('/update-report', (req, res) => {
  const { id, debtorData, macroData } = req.body;

  const reportIndex = ProfileReportsData.findIndex(report => report.id === id);
  
  if (reportIndex === -1) {
    return res.status(404).json({ message: 'Отчёт с таким id не найден' });
  }
  ProfileReportsData[reportIndex].debtorData = debtorData || ProfileReportsData[reportIndex].debtorData;
  ProfileReportsData[reportIndex].macroData = macroData || ProfileReportsData[reportIndex].macroData;
  res.status(200).json({ message: 'Отчёт успешно обновлен', data: ProfileReportsData[reportIndex] });
});

app.post('/create-report', (req, res) => {
  const newReport = req.body;
  console.log(newReport)
  if (!newReport.id || !newReport.date || !newReport.title || !newReport.owner) {
    return res.status(400).json({ message: 'Не все обязательные поля переданы' });
  }
  ProfileReportsData.push(newReport);
  res.status(201).json({ message: 'Новый отчёт успешно создан', data: newReport });
});

app.post('/export', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'ecl.xlsx');
    
    res.download(filePath, 'ecl.xlsx', (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Ошибка при экспорте файла' });
  }
});

app.post('/exportcredit', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'creditList.xlsx');
    
    res.download(filePath, 'creditList.xlsx', (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Ошибка при экспорте файла' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
