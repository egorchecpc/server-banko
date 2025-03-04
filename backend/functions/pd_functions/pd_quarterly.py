import requests
from gigachat.models import Function, FunctionParameters

def get_pd_quarterly_data(year, quarter):
    """Получает данные о вероятности дефолта за указанный год и квартал."""
    url = "https://banko-r-backend.stacklevel.group/api/probabilityDefault/quarterly"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        key = f"year{year}"
        
        if key in data and len(data[key]) >= quarter:
            return data[key][quarter - 1]  # Индексация массива начинается с 0
        
        return {"error": f"Данные за {year} год, {quarter} квартал не найдены."}
    
    return {"error": "Ошибка при получении данных."}

# Описание функции для GigaChat
pd_quarterly_function = Function(
    name="get_pd_quarterly_data",
    description="Получает данные о вероятности дефолта (PD) в разных корзинах просрочки для всех кварталов определённого года. Вероятность получается в абсолютных единицах от 0 до 1",
    parameters=FunctionParameters(
        type="object",
        properties={
            "year": {
                "type": "integer",
                "description": "Год, за который требуется получить данные PD."
            },
            "quarter": {
                "type": "integer",
                "description": "Квартал, за который требуется получить данные PD (1-4)."
            }
        },
        required=["year", "quarter"],
    ),
)
