import Icon from "@/components/ui/icon";

interface Props {
  onSchedule: () => void;
}

const subjects = [
  { name: "Математика", grade: 5, avg: 4.8, progress: 96 },
  { name: "Русский язык", grade: 4, avg: 4.3, progress: 86 },
  { name: "История", grade: 5, avg: 4.9, progress: 98 },
  { name: "Физика", grade: 4, avg: 4.1, progress: 82 },
  { name: "Химия", grade: 3, avg: 3.7, progress: 74 },
  { name: "Литература", grade: 5, avg: 4.7, progress: 94 },
  { name: "Биология", grade: 4, avg: 4.4, progress: 88 },
  { name: "Английский язык", grade: 4, avg: 4.2, progress: 84 },
];

const recentGrades = [
  { subject: "Математика", type: "Контрольная работа", grade: 5, date: "27 мар" },
  { subject: "Физика", type: "Устный ответ", grade: 4, date: "26 мар" },
  { subject: "Химия", type: "Самостоятельная", grade: 3, date: "25 мар" },
  { subject: "Русский язык", type: "Диктант", grade: 5, date: "24 мар" },
  { subject: "История", type: "Тест", grade: 5, date: "23 мар" },
];

const gradeColor = (g: number) => {
  if (g === 5) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (g === 4) return "text-blue-600 bg-blue-50 border-blue-200";
  if (g === 3) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
};

const progressColor = (p: number) => {
  if (p >= 90) return "bg-emerald-500";
  if (p >= 80) return "bg-blue-500";
  if (p >= 70) return "bg-amber-500";
  return "bg-red-500";
};

export default function Dashboard({ onSchedule }: Props) {
  const gpa = (subjects.reduce((s, x) => s + x.avg, 0) / subjects.length).toFixed(2);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
      {/* Student card */}
      <div className="bg-white border border-border rounded-lg p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--school-navy))] flex items-center justify-center text-white font-['Oswald'] text-2xl font-bold">
            ПИ
          </div>
          <div>
            <h2 className="font-['Oswald'] text-xl font-semibold text-foreground">
              Иванов Пётр Сергеевич
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-muted-foreground">10 «А» класс</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">2025–2026 уч. год</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-['Oswald'] text-4xl font-bold text-[hsl(var(--school-navy))]">{gpa}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Средний балл</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Посещаемость", value: "94%", icon: "CheckCircle", color: "text-emerald-600" },
          { label: "Выполнено заданий", value: "87%", icon: "ClipboardCheck", color: "text-blue-600" },
          { label: "До конца четверти", value: "18 дн.", icon: "Clock", color: "text-amber-600" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white border border-border rounded-lg p-5 flex items-center gap-4">
            <div className={`${color}`}>
              <Icon name={icon} size={22} />
            </div>
            <div>
              <div className={`font-['Oswald'] text-2xl font-semibold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Subjects table */}
        <div className="col-span-3 bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-['Oswald'] text-base font-semibold uppercase tracking-wide text-foreground">
              Успеваемость по предметам
            </h3>
          </div>
          <div className="divide-y divide-border">
            {subjects.map((s) => (
              <div key={s.name} className="px-6 py-3.5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground mb-1.5">{s.name}</div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${progressColor(s.progress)}`}
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground w-12 text-right shrink-0">
                  {s.avg}
                </div>
                <div className={`w-8 h-8 rounded border text-sm font-['Oswald'] font-semibold flex items-center justify-center shrink-0 ${gradeColor(s.grade)}`}>
                  {s.grade}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent grades */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-white border border-border rounded-lg overflow-hidden flex-1">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-['Oswald'] text-base font-semibold uppercase tracking-wide text-foreground">
                Последние оценки
              </h3>
            </div>
            <div className="divide-y divide-border">
              {recentGrades.map((g, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">{g.subject}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{g.type} · {g.date}</div>
                  </div>
                  <div className={`w-8 h-8 rounded border text-sm font-['Oswald'] font-semibold flex items-center justify-center ${gradeColor(g.grade)}`}>
                    {g.grade}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onSchedule}
            className="bg-[hsl(var(--school-navy))] text-white rounded-lg p-5 flex items-center justify-between hover:opacity-90 transition group"
          >
            <div>
              <div className="font-['Oswald'] text-base font-medium uppercase tracking-wide mb-0.5">
                Расписание на неделю
              </div>
              <div className="text-white/60 text-xs">Посмотреть уроки</div>
            </div>
            <Icon name="ArrowRight" size={18} className="text-[hsl(var(--school-gold))] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}
