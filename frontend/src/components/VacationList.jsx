import { useEffect, useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { getVacations } from "@/api/vacationApi";
import { formatDate } from "@/lib/format";
import { STATUS_BADGE_VARIANT, STATUS_LABELS } from "@/lib/status";

export default function VacationList() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [vacations, setVacations] = useState([]);

    useEffect(() => {
        getVacations().then(setVacations);
    }, []);

    const filteredVacations = useMemo(() => {
        if (statusFilter === "all") return vacations;
        return vacations.filter((item) => item.status === statusFilter);
    }, [statusFilter, vacations]);

    return (
        <Card>
            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0">
                <div className="space-y-1.5">
                    <CardTitle>Список заявок</CardTitle>
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
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

            <CardContent>
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
                            {filteredVacations.map((vacation) => (
                                <TableRow key={vacation.id}>
                                    <TableCell className="font-medium">
                                        {vacation.fullName}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(vacation.startDate)} —{" "}
                                        {formatDate(vacation.endDate)}
                                    </TableCell>
                                    <TableCell>{vacation.days}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                STATUS_BADGE_VARIANT[
                                                    vacation.status
                                                ]
                                            }
                                        >
                                            {STATUS_LABELS[vacation.status]}
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
                                                    {vacation.rejectionReason}
                                                </p>
                                            ) : null}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {vacation.status === "pending" ? (
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    Одобрить
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                >
                                                    Отклонить
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                -
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
