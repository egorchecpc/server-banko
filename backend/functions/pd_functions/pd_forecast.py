import requests
from gigachat.models import Function, FunctionParameters

def get_pd_forecast_data(year):
    """Получает прогнозные данные о вероятности дефолта за указанный год."""
    url = "https://banko-r-backend.stacklevel.group/api/probabilityDefault/forecast"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        key = f"year{year}"
        if key in data and "cpd" in data[key]:
            return data[key]["cpd"]
        return {"error": f"Прогнозные данные за {year} год не найдены."}
    
    return {"error": "Ошибка при получении данных."}

# Описание функции для GigaChat
pd_forecast_function = Function(
    name="get_pd_forecast_data",
    description="Получает прогнозные данные о будущей вероятности дефолта (PD) в разных корзинах просрочки за указанный прогнозный год (года с 2024 по 2040). Вероятность получается в абсолютных единицах от 0 до 1.",
    parameters=FunctionParameters(
        type="object",
        properties={
            "year": {
                "type": "integer",
                "description": "Год, за который требуется получить прогнозные данные PD."
            }
        },
        required=["year"],
    ),
)