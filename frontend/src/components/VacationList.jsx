import { formatDate } from "@/lib/format";
import { STATUS_BADGE_VARIANT, STATUS_LABELS } from "@/lib/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useVacationList } from "./hooks/useVacationList";

export default function VacationList({ vacations, onChanged }) {
    const {
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
    } = useVacationList({ vacations, onChanged });

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0">
                    <div className="space-y-1.5">
                        <CardTitle>Список заявок</CardTitle>
                    </div>

                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все статусы</SelectItem>
                            <SelectItem value="pending">Ожидает</SelectItem>
                            <SelectItem value="approved">Одобрено</SelectItem>
                            <SelectItem value="rejected">Отклонено</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>

                <CardContent className="space-y-4">
                    {actionError ? (
                        <p className="text-sm text-destructive">
                            {actionError}
                        </p>
                    ) : null}

                    {filteredVacations.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Заявок пока нет
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ФИО</TableHead>
                                    <TableHead>Период</TableHead>
                                    <TableHead>Дни</TableHead>
                                    <TableHead>Статус</TableHead>
                                    <TableHead>Причина / отказ</TableHead>
                                    <TableHead className="text-right">
                                        Действия
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredVacations.map((vacation) => {
                                    const isBusy = pendingId === vacation.id;

                                    return (
                                        <TableRow key={vacation.id}>
                                            <TableCell className="font-medium">
                                                {vacation.fullName}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(vacation.startDate)}{" "}
                                                — {formatDate(vacation.endDate)}
                                            </TableCell>
                                            <TableCell>
                                                {vacation.days}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        STATUS_BADGE_VARIANT[
                                                            vacation.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        STATUS_LABELS[
                                                            vacation.status
                                                        ]
                                                    }
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="max-w-[220px] whitespace-normal">
                                                <div className="space-y-1">
                                                    <p className="text-sm">
                                                        {vacation.reason}
                                                    </p>
                                                    {vacation.rejectionReason ? (
                                                        <p className="text-sm text-destructive">
                                                            Отказ:{" "}
                                                            {
                                                                vacation.rejectionReason
                                                            }
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {vacation.status ===
                                                "pending" ? (
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            disabled={
                                                                isBusy ||
                                                                isRejecting
                                                            }
                                                            onClick={() =>
                                                                handleApprove(
                                                                    vacation.id,
                                                                )
                                                            }
                                                        >
                                                            {isBusy
                                                                ? "…"
                                                                : "Одобрить"}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            disabled={
                                                                isBusy ||
                                                                isRejecting
                                                            }
                                                            onClick={() =>
                                                                openRejectDialog(
                                                                    vacation.id,
                                                                )
                                                            }
                                                        >
                                                            Отклонить
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">
                                                        —
                                                    </span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog
                open={Boolean(rejectId)}
                onOpenChange={(open) => {
                    if (!open) closeRejectDialog();
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Отклонить заявку</DialogTitle>
                        <DialogDescription>
                            Укажите причину отказа — она будет видна в списке
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-2">
                        <Label htmlFor="rejectionReason">Причина отказа</Label>
                        <Textarea
                            id="rejectionReason"
                            value={rejectionReason}
                            onChange={(event) =>
                                setRejectionReason(event.target.value)
                            }
                            placeholder="Например: пересечение с другим отпуском"
                            rows={3}
                            disabled={isRejecting}
                        />
                        {rejectError ? (
                            <p className="text-sm text-destructive">
                                {rejectError}
                            </p>
                        ) : null}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeRejectDialog}
                            disabled={isRejecting}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleReject}
                            disabled={isRejecting}
                        >
                            {isRejecting ? "Отклонение…" : "Отклонить"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
