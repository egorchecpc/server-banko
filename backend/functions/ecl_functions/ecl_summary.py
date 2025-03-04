import requests
from gigachat.models import Function, FunctionParameters

def get_ecl_summary_data(year):
    """Получает данные о ожидаемых кредитных убытках по продуктам (ECL Summary)."""
    url = "https://banko-r-backend.stacklevel.group/api/probabilityDefault/yearly"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        key = f"year{year}"
        if key in data and "cpd" in data[key]:
            return data[key]["cpd"]
        return {"error": f"Данные за {year} год не найдены."}
    
    return {"error": "Ошибка при получении данных."}

# Описание функции для GigaChat
pd_function = Function(
    name="get_pd_data",
    description="Получает данные о вероятности дефолта (PD) в разных корзинах просрочки за указанный год. Вероятность получается в абсолютных единицах от 0 до 1.",
    parameters=FunctionParameters(
        type="object",
        properties={
            "year": {
                "type": "integer",
                "description": "Год, за который требуется получить данные PD."
            }
        },
        required=["year"],
    ),
)