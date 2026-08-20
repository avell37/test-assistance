# Заявки на отпуск

Fullstack-модуль для подачи и обработки заявок на отпуск (тестовое задание Assistance Group).

## Стек

- **Backend:** Node.js + Express + Prisma
- **DB:** PostgreSQL (локально)
- **Frontend:** React + Vite
- **API:** REST

## Структура

```
├── backend/     # Express API + Prisma (порт 3001)
├── frontend/    # React UI (порт 5173)
└── README.md
```

## База данных

1. Создать локальную БД `vacation` (или с помощью Docker)
2. Прописать креды в `backend/.env` (см. `.env.example`)
3. Применить схему:

```bash
cd backend
npm run db:migrate
```

## Запуск

```bash
npm run install:all
npm run dev:backend
npm run dev:frontend
```

- API: http://localhost:3001
- UI: http://localhost:5173

Сервер стартует только после успешного подключения к БД.
