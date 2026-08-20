# Заявки на отпуск

Fullstack-модуль для подачи и обработки заявок на отпуск (тестовое задание Assistance Group).

## Стек

- **Backend:** Node.js + Express (in-memory хранилище)
- **Frontend:** React + Vite
- **API:** REST

## Структура

```
├── backend/     # Express API (порт 3001)
├── frontend/    # React UI (порт 5173)
└── README.md
```

## Запуск

Нужны Node.js 18+.

```bash
# Установка зависимостей
npm run install:all

# Терминал 1 — API
npm run dev:backend

# Терминал 2 — UI
npm run dev:frontend
```

- API: http://localhost:3001/api/health
- UI: http://localhost:5173
