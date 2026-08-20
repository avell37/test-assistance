import { useCallback, useEffect, useState } from 'react';
import { getVacations } from '@/api/vacationApi';
import VacationForm from '@/components/VacationForm';
import VacationList from '@/components/VacationList';

export default function App() {
  const [vacations, setVacations] = useState([]);

  const loadVacations = useCallback(async () => {
    const data = await getVacations();
    setVacations(data);
  }, []);

  useEffect(() => {
    loadVacations();
  }, [loadVacations]);

  return (
    <div className="min-h-svh bg-muted/40">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Заявки на отпуск
          </h1>
        </header>

        <VacationForm onCreated={loadVacations} />
        <VacationList vacations={vacations} onChanged={loadVacations} />
      </div>
    </div>
  );
}
