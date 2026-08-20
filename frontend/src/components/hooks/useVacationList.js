import { useMemo, useState } from "react";
import { approveVacation, rejectVacation } from "@/api/vacationApi";

export function useVacationList({ vacations, onChanged }) {
    const [statusFilter, setStatusFilter] = useState("all");
    const [pendingId, setPendingId] = useState(null);
    const [rejectId, setRejectId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [rejectError, setRejectError] = useState("");
    const [actionError, setActionError] = useState("");
    const [isRejecting, setIsRejecting] = useState(false);

    const filteredVacations = useMemo(() => {
        if (statusFilter === "all") return vacations;
        return vacations.filter((item) => item.status === statusFilter);
    }, [statusFilter, vacations]);

    async function handleApprove(id) {
        setActionError("");
        setPendingId(id);
        try {
            await approveVacation(id);
            await onChanged?.();
        } catch (err) {
            setActionError(
                err.response?.data?.error ||
                    err.response?.data?.message ||
                    "Не удалось одобрить заявку",
            );
        } finally {
            setPendingId(null);
        }
    }

    function openRejectDialog(id) {
        setRejectId(id);
        setRejectionReason("");
        setRejectError("");
    }

    function closeRejectDialog() {
        if (isRejecting) return;
        setRejectId(null);
        setRejectionReason("");
        setRejectError("");
    }

    async function handleReject() {
        if (!rejectionReason.trim()) {
            setRejectError("Укажите причину отказа");
            return;
        }

        setIsRejecting(true);
        setRejectError("");
        setActionError("");
        try {
            await rejectVacation(rejectId, rejectionReason.trim());
            setRejectId(null);
            setRejectionReason("");
            await onChanged?.();
        } catch (err) {
            setRejectError(
                err.response?.data?.error ||
                    err.response?.data?.message ||
                    "Не удалось отклонить заявку",
            );
        } finally {
            setIsRejecting(false);
        }
    }

    return {
        statusFilter,
        pendingId,
        rejectId,
        rejectionReason,
        rejectError,
        actionError,
        isRejecting,
        filteredVacations,
        setStatusFilter,
        setRejectionReason,
        handleApprove,
        openRejectDialog,
        closeRejectDialog,
        handleReject,
    };
}
