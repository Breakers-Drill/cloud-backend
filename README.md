# Cloud Backend

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <url>
cd drill-cloud-backend
```

### 2. Сборка и запуск

```bash
docker compose down -v && docker compose up --build
```

### Swagger UI

Swagger UI расположен по пути - `/docs`

## Для разработчика

### 1. Клонирование репозитория

```bash
git clone <rul>
cd drill-cloud-backend
```

### 2. Установка зависимостей и настройка проекта

```bash
npm install
```

- Открыть или создать файл `.env` и настроить по примеру из `.env-example`

### 2. Запуск и инициализация бд

- Перейти в `.env` и изменить в строчке `DATABASE_URL` хостинг подключения с `postgres` на `localhost`.

- Изменить port, если на вашем пк уже занят порт 5432, в файле `docker-compose.yml`

```bash
docker compose up postgres -d
npx prisma db push
```

### 3. Запуск приложения

```bash
yarn start:dev
```

или

```bash
npm run start:dev
```

### Пример .env файла:

- В файле `.env-example`

- Или пример файла:

```
DATABASE_URL="postgresql://postgres:12341234@localhost:5432/drill-cloud"

INFRA_SECRET_KEY="SECRET-KEY"

APP_NAME="Drill-Cloud"
APP_PORT=3000
APP_CORS_ORIGIN="*"

SENSOR_DATA_GET_LIMIT=30
SENSOR_DATA_GET_DEFAULT_INTERVAL=1
```
