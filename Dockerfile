# Базовый образ
FROM node:20

# Директория внутри контейнера
WORKDIR /usr/src/cloud-backend

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование файлов
COPY . .

# Генерация клиента prisma и инициализация базы данных
RUN npx prisma generate

# Сборка NestJS проекта
RUN npm run build

# Открываем 3000 порт
EXPOSE 3000

RUN chmod +x ./scripts/start.sh

# Запуск приложения при запуске контейнера
CMD ["sh", "/usr/src/cloud-backend/scripts/start.sh"]
