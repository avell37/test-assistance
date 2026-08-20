import { prisma } from "../db.js";
import {
    calcDays,
    parseDate,
    STATUSES,
    validateCreateBody,
} from "../utils/vacation.utils.js";

class VacationController {
    async getVacations(req, res) {
        try {
            const { status } = req.query;

            if (status && !STATUSES.includes(status)) {
                return res
                    .status(400)
                    .json({ error: "Несуществующий статус для фильтрации" });
            }

            const vacations = await prisma.vacationRequest.findMany({
                where: status ? { status } : undefined,
                orderBy: { createdAt: "desc" },
            });

            return res.json(vacations);
        } catch (err) {
            return res.status(500).json({
                message: "Непредвиденная ошибка",
                error: err.message,
            });
        }
    }

    async postVacation(req, res) {
        try {
            const validationError = validateCreateBody(req.body);
            if (validationError) {
                return res.status(400).json({ error: validationError });
            }

            const { fullName, startDate, endDate, reason } = req.body;

            const vacation = await prisma.vacationRequest.create({
                data: {
                    fullName: fullName.trim(),
                    startDate: parseDate(startDate),
                    endDate: parseDate(endDate),
                    reason: reason.trim(),
                    status: "pending",
                    days: calcDays(startDate, endDate),
                },
            });

            res.status(201).json(vacation);
        } catch (err) {
            return res.status(500).json({
                message: "Непредвиденная ошибка",
                error: err.message,
            });
        }
    }

    async approveVacation(req, res) {
        try {
            const existing = await prisma.vacationRequest.findUnique({
                where: { id: req.params.id },
            });

            if (!existing) {
                return res
                    .status(404)
                    .json({ error: "Запрос на отпуск не найден" });
            }

            if (existing.status !== "pending") {
                return res.status(400).json({
                    error: "Можно принять только ожидающую заявку",
                });
            }

            const vacation = await prisma.vacationRequest.update({
                where: { id: req.params.id },
                data: { status: "approved", rejectionReason: null },
            });

            res.json(vacation);
        } catch (err) {
            return res.status(500).json({
                message: "Непредвиденная ошибка",
                error: err.message,
            });
        }
    }

    async rejectVacation(req, res) {
        try {
            const { rejectionReason } = req.body;
            if (!rejectionReason?.trim()) {
                return res
                    .status(400)
                    .json({ error: "Причина отказа обязательна" });
            }

            const existing = await prisma.vacationRequest.findUnique({
                where: { id: req.params.id },
            });

            if (!existing) {
                return res
                    .status(404)
                    .json({ error: "Запрос на отпуск не найден" });
            }

            if (existing.status !== "pending") {
                return res.status(400).json({
                    error: "Можно отклонить только ожидающую заявку",
                });
            }

            const vacation = await prisma.vacationRequest.update({
                where: { id: req.params.id },
                data: {
                    status: "rejected",
                    rejectionReason: rejectionReason.trim(),
                },
            });

            res.json(vacation);
        } catch (err) {
            return res.status(500).json({
                message: "Непредвиденная ошибка",
                error: err.message,
            });
        }
    }
}

export default new VacationController();
