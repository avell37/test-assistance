import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

export const STATUSES = ["pending", "approved", "rejected"];

const DATE_FORMATS = ["YYYY-MM-DD", "DD.MM.YYYY"];

export function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }

    if (typeof value !== "string") return null;

    const parsed = dayjs(value.trim(), DATE_FORMATS, true);
    return parsed.isValid() ? parsed.toDate() : null;
}

export function validateCreateBody(body) {
    const { fullName, startDate, endDate, reason } = body;

    if (!fullName?.trim()) return "Необходимы имя и фамилия";
    if (!startDate) return "Необходима дата начала отпуска";
    if (!endDate) return "Необходима дата конца отпуска";
    if (!reason?.trim()) return "Причина необходима";

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (!start) {
        return "Некорректная дата начала (ожидается YYYY-MM-DD или DD.MM.YYYY)";
    }
    if (!end) {
        return "Некорректная дата конца (ожидается YYYY-MM-DD или DD.MM.YYYY)";
    }
    if (dayjs(end).isBefore(dayjs(start), "day")) {
        return "Дата конца отпуска не может быть раньше, чем дата начала отпуска";
    }

    return null;
}

export function calcDays(startDate, endDate) {
    const start = dayjs(parseDate(startDate));
    const end = dayjs(parseDate(endDate));
    return end.diff(start, "day") + 1;
}
