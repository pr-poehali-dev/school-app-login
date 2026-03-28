import { useState } from "react";
import Icon from "@/components/ui/icon";

const classes = ["10 «А»", "10 «Б»", "9 «А»", "8 «В»"];

const journal: Record<string, { name: string; grades: (number | null)[] }[]> = {
  "10 «А»": [
    { name: "Иванов Пётр", grades: [5, 4, 5, null, 5] },
    { name: "Смирнова Анна", grades: [4, 5, 4, 5, null] },
    { name: "Козлов Дмитрий", grades: [3, 3, 4, 3, 4] },
    { name: "Петрова Мария", grades: [5, 5, 5, 5, 5] },
    { name: "Орлов Никита", grades: [4, null, 4, 4, 3] },
    { name: "Новикова Елена", grades: [3, 4, 3, null, 4] },
    { name: "Фёдоров Алексей", grades: [5, 4, 5, 4, null] },
  ],
  "10 «Б»": [
    { name: "Белова Ксения", grades: [4, 4, 5, 4, 4] },
    { name: "Захаров Иван", grades: [3, 3, 3, 4, 3] },
    { name: "Громова Светлана", grades: [5, 5, 4, 5, 5] },
    { name: "Карпов Глеб", grades: [4, 3, 4, null, 4] },
    { name: "Романова Ольга", grades: [5, 4, 5, 5, null] },
  ],
  "9 «А»": [
    { name: "Сидоров Павел", grades: [4, 5, 4, 4, 5] },
    { name: "Лебедева Юлия", grades: [3, 4, 3, 3, 4] },
    { name: "Морозов Кирилл", grades: [5, 5, 5, 4, 5] },
  ],
  "8 «В»": [
    { name: "Тихонова Валерия", grades: [4, 4, 5, 4, 4] },
    { name: "Воронов Степан", grades: [3, 3, 4, 3, null] },
    { name: "Зайцева Диана", grades: [5, 4, 4, 5, 5] },
  ],
};

const lessonDates = ["17 мар", "19 мар", "21 мар", "24 мар", "26 мар"];

const gradeColor = (g: number | null) => {
  if (!g) return "text-muted-foreground bg-muted";
  if (g === 5) return "text-emerald-700 bg-emerald-50";
  if (g === 4) return "text-blue-700 bg-blue-50";
  if (g === 3) return "text-amber-700 bg-amber-50";
  return "text-red-700 bg-red-50";
};

const upcoming = [
  { class: "10 «А»", subject: "Математика", type: "Контрольная", date: "31 мар", time: "08:55" },
  { class: "9 «А»", subject: "Математика", type: "Тест", date: "1 апр", time: "10:55" },
  { class: "10 «Б»", subject: "Алгебра", type: "Самостоятельная", date: "2 апр", time: "08:00" },
];

export default function TeacherDashboard() {
  const [activeClass, setActiveClass] = useState("10 «А»");
  const students = journal[activeClass] || [];

  const classAvg = (list: typeof students) => {
    const all = list.flatMap((s) => s.grades.filter((g): g is number => g !== null));
    return all.length ? (all.reduce((a, b) => a + b, 0) / all.length).toFixed(1) : "—";
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
      {/* Teacher card */}
      <div className="bg-white border border-border rounded-lg p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--school-navy))] flex items-center justify-center text-white font-['Oswald'] text-2xl font-bold">
            КД
          </div>
          <div>
            <h2 className="font-['Oswald'] text-xl font-semibold text-foreground">
              Козлов Дмитрий Николаевич
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-muted-foreground">Учитель математики</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">Классный руководитель 10 «А»</span>
            </div>
          </div>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <div className="font-['Oswald'] text-3xl font-bold text-[hsl(var(--school-navy))]">4</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Класса</div>
          </div>
          <div>
            <div className="font-['Oswald'] text-3xl font-bold text-[hsl(var(--school-navy))]">18</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Уроков / нед.</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Journal */}
        <div className="col-span-2 bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
            <h3 className="font-['Oswald'] text-base font-semibold uppercase tracking-wide text-foreground shrink-0">
              Журнал успеваемости
            </h3>
            <div className="flex gap-1 flex-wrap justify-end">
              {classes.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveClass(c)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeClass === c
                      ? "bg-[hsl(var(--school-navy))] text-white"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-44">
                    Ученик
                  </th>
                  {lessonDates.map((d) => (
                    <th key={d} className="px-2 py-2.5 text-xs font-semibold text-muted-foreground text-center">
                      {d}
                    </th>
                  ))}
                  <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground text-center">
                    Ср. балл
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((s) => {
                  const filled = s.grades.filter((g): g is number => g !== null);
                  const avg = filled.length
                    ? (filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(1)
                    : "—";
                  return (
                    <tr key={s.name} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 font-medium text-foreground">{s.name}</td>
                      {s.grades.map((g, i) => (
                        <td key={i} className="px-2 py-3 text-center">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded text-xs font-['Oswald'] font-semibold ${gradeColor(g)}`}>
                            {g ?? "·"}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center font-['Oswald'] font-semibold text-[hsl(var(--school-navy))]">
                        {avg}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/40">
                  <td className="px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Средний по классу
                  </td>
                  {lessonDates.map((_, i) => {
                    const vals = students.map((s) => s.grades[i]).filter((g): g is number => g !== null);
                    const avg = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "—";
                    return (
                      <td key={i} className="px-2 py-2.5 text-center text-xs font-semibold text-[hsl(var(--school-navy))]">
                        {avg}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2.5 text-center font-['Oswald'] font-bold text-[hsl(var(--school-navy))]">
                    {classAvg(students)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Stats */}
          <div className="bg-white border border-border rounded-lg p-5">
            <h3 className="font-['Oswald'] text-sm font-semibold uppercase tracking-wide text-foreground mb-4">
              Статистика класса
            </h3>
            <div className="space-y-3">
              {classes.map((c) => {
                const avg = parseFloat(classAvg(journal[c]));
                const pct = ((avg / 5) * 100).toFixed(0);
                return (
                  <div key={c}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-foreground">{c}</span>
                      <span className="text-[hsl(var(--school-navy))] font-semibold">{classAvg(journal[c])}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[hsl(var(--school-navy))]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-white border border-border rounded-lg overflow-hidden flex-1">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-['Oswald'] text-sm font-semibold uppercase tracking-wide text-foreground">
                Ближайшие работы
              </h3>
            </div>
            <div className="divide-y divide-border">
              {upcoming.map((u, i) => (
                <div key={i} className="px-5 py-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-[hsl(var(--school-navy))]">{u.class}</span>
                    <span className="text-[10px] bg-[hsl(var(--school-navy))] text-white rounded px-1.5 py-0.5 font-medium">
                      {u.type}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-foreground">{u.subject}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Icon name="Calendar" size={11} />
                    <span>{u.date}, {u.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
