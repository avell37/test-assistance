import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import VacationList from "./components/VacationList";

export default function App() {
    return (
        <div className="min-h-svh bg-muted/40">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
                <header>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Заявки на отпуск
                    </h1>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle>Новая заявка</CardTitle>
                        <CardDescription>Заглушка под форму</CardDescription>
                    </CardHeader>
                </Card>

                <VacationList />
            </div>
        </div>
    );
}
