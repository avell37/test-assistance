import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useVacationForm } from './hooks/useVacationForm';

export default function VacationForm({ onCreated }) {
  const { form, error, isSubmitting, handleChange, handleSubmit } =
    useVacationForm({ onCreated });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Новая заявка</CardTitle>
        <CardDescription>
          Заполните поля и отправьте заявку на отпуск
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">ФИО</Label>
            <Input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Иван Иванов"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Дата с</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endDate">Дата по</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reason">Причина</Label>
            <Textarea
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Ежегодный отпуск"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" disabled={isSubmitting} className="w-fit">
            {isSubmitting ? 'Отправка…' : 'Отправить заявку'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
