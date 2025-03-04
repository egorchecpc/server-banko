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
import fs from 'fs'
import { promisify } from "util";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = promisify(exec);
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

const createTempPythonScript = async (messages) => {
  const scriptDir = path.join(__dirname, 'temp');
  const scriptPath = path.join(scriptDir, `chat_${Date.now()}.py`);
  
  // Ensure the temp directory exists
  if (!fs.existsSync(scriptDir)) {
    fs.mkdirSync(scriptDir, { recursive: true });
  }
  
  // Format messages for Python
  const formattedMessages = messages.map(msg => {
    if (msg.role === 'user') {
      return `Messages(role=MessagesRole.USER, content="${msg.content.replace(/"/g, '\\"')}")`;
    } else if (msg.role === 'assistant') {
      return `Messages(role=MessagesRole.ASSISTANT, content="${msg.content.replace(/"/g, '\\"')}")`;
    } else if (msg.role === 'function') {
      return `Messages(role=MessagesRole.FUNCTION, content='${msg.content.replace(/'/g, "\\'")}', name="${msg.name || ''}")`;
    }
    return '';
  }).filter(Boolean);

  // Create Python script
  const script = `
import json
import sys
import os

# Добавляем корневой каталог проекта в путь импорта
sys.path.insert(0, "${__dirname.replace(/\\/g, '\\\\')}")
from gigachat.models import Chat, Messages, MessagesRole
from gigachat import GigaChat
from functions.pd_functions.pd_yearly import pd_function, get_pd_data
from functions.pd_functions.pd_quarterly import pd_quarterly_function, get_pd_quarterly_data
from functions.pd_functions.pd_forecast import pd_forecast_function, get_pd_forecast_data

try:
    with GigaChat(
        credentials="MTZiOWZkMjMtMzMzMS00NmM3LTg0ZjAtNWM0YmI2OTExZDZhOjFiOGUxYjc2LTVkNzYtNGQyMS1iNWYxLWVhMjIwYjUyMjczMg==",
        model="GigaChat", 
        verify_ssl_certs=False
    ) as giga:
        messages = [
            ${formattedMessages.join(',\n            ')}
        ]
        
        chat = Chat(messages=messages, functions=[pd_function, pd_quarterly_function, pd_forecast_function])
        resp = giga.chat(chat).choices[0]
        mess = resp.message
        
        result = {"content": mess.content}
        
        if resp.finish_reason == "function_call":
            result["function_call"] = {
                "name": mess.function_call.name,
                "arguments": mess.function_call.arguments
            }
            
            func_result = None
            
            if mess.function_call.name == "get_pd_data":
                year = mess.function_call.arguments.get("year", None)
                if year:
                    func_result = get_pd_data(year)
            
            elif mess.function_call.name == "get_pd_forecast_data":
                year = mess.function_call.arguments.get("year", None)
                if year:
                    func_result = get_pd_forecast_data(year)
            
            elif mess.function_call.name == "get_pd_quarterly_data":
                year = mess.function_call.arguments.get("year", None)
                quarter = mess.function_call.arguments.get("quarter", None)
                if year and quarter:
                    func_result = get_pd_quarterly_data(year, quarter)
            
            if func_result:
                result["function_result"] = func_result
                
                # Добавляем результат функции в сообщения и отправляем еще один запрос для получения финального ответа
                function_message = Messages(
                    role=MessagesRole.FUNCTION,
                    name=mess.function_call.name,
                    content=json.dumps(func_result)
                )
                
                # Создаем новый запрос с добавленным результатом функции
                follow_up_messages = messages + [
                    Messages(role=MessagesRole.ASSISTANT, content=result["content"], function_call={"name": mess.function_call.name, "arguments": mess.function_call.arguments}),
                    function_message
                ]
                
                follow_up_chat = Chat(messages=follow_up_messages)
                follow_up_resp = giga.chat(follow_up_chat).choices[0]
                result["final_response"] = follow_up_resp.message.content
        
        print(json.dumps(result))
except Exception as e:
    print(json.dumps({"error": str(e)}), file=sys.stderr)
    sys.exit(1)
  `;
  
  fs.writeFileSync(scriptPath, script);
  return scriptPath;
};

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Create a temporary Python script
    const scriptPath = await createTempPythonScript(messages);
    
    // Execute the Python script
    const { stdout, stderr } = await execPromise(`python ${scriptPath}`);
    
    // Clean up temporary file
    fs.unlinkSync(scriptPath);
    
    if (stderr) {
      console.error('Python script error:', stderr);
      return res.status(500).json({ error: 'Error executing GigaChat' });
    }
    
    // Parse the result
    const result = JSON.parse(stdout);
    
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    
    const response = {};
    
    // Если есть финальный ответ после вызова функции, используем его
    if (result.final_response) {
      response.message = result.final_response;
    } else {
      response.message = result.content;
    }
    
    // If there was a function call and result
    if (result.function_result) {
      response.functionResult = result.function_result;
    }
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('API handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
