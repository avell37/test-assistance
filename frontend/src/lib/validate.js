export function validate(form) {
    if (!form.fullName.trim()) return "Укажите ФИО";
    if (!form.startDate) return "Укажите дату начала";
    if (!form.endDate) return "Укажите дату окончания";
    if (!form.reason.trim()) return "Укажите причину";
    if (form.endDate < form.startDate) {
        return "Дата окончания не может быть раньше даты начала";
    }
    return null;
}
