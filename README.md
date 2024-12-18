Первый запуск контейнеров
========================
Скопируйте файлы:
 - .env.dist в .env  
 - frontend/.env.dist в frontend/.env

(в корне проекта можно выполнить команду)

        mv -n .env.dist .env; mv -n frontend/.env.dist frontend/.env

Запустите контейнеры:
        
        sudo docker-compose up -d --build


Запуск проекта
========================
Выполните команду:

        sudo docker-compose up -d



