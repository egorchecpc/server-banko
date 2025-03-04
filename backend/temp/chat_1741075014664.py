
import json
import sys
import os

# Добавляем корневой каталог проекта в путь импорта
sys.path.insert(0, "D:\\banko_server\\backend")
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
            Messages(role=MessagesRole.USER, content="Сколько будет 2+\""),
            Messages(role=MessagesRole.ASSISTANT, content="Извините, произошла ошибка при обработке вашего запроса."),
            Messages(role=MessagesRole.USER, content="2+2=?")
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
  