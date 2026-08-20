import "dotenv/config";
import cors from "cors";
import express from "express";
import { prisma } from "./db.js";
import router from "./routers/routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "API запущено" });
});

app.use(router);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});

async function start() {
    try {
        await prisma.$connect();
        console.log("Подключение к БД успешно");

        app.listen(PORT, () => {
            console.log(`Сервер запущен: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Не удалось подключиться к БД:", error.message);
        process.exit(1);
    }
}

start();
