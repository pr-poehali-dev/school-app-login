import { useState } from "react";
import Icon from "@/components/ui/icon";

const children = [
  { id: 1, name: "Иванов Пётр", class: "10 «А»", initials: "ПИ" },
  { id: 2, name: "Иванова Соня", class: "7 «Б»", initials: "СИ" },
];

const gradesData: Record<number, { subject: string; grade: number; avg: number; progress: number }[]> = {
  1: [
    { subject: "Математика", grade: 5, avg: 4.8, progress: 96 },
    { subject: "Русский язык", grade: 4, avg: 4.3, progress: 86 },
    { subject: "История", grade: 5, avg: 4.9, progress: 98 },
    { subject: "Физика", grade: 4, avg: 4.1, progress: 82 },
    { subject: "Химия", grade: 3, avg: 3.7, progress: 74 },
    { subject: "Литература", grade: 5, avg: 4.7, progress: 94 },
  ],
  2: [
    { subject: "Математика", grade: 4, avg: 4.2, progress: 84 },
    { subject: "Русский язык", grade: 5, avg: 4.6, progress: 92 },
    { subject: "История", grade: 4, avg: 4.0, progress: 80 },
    { subject: "Биология", grade: 5, avg: 4.8, progress: 96 },
    { subject: "Английский язык", grade: 3, avg: 3.5, progress: 70 },
    { subject: "Литература", grade: 4, avg: 4.3, progress: 86 },
  ],
};

const recentData: Record<number, { subject: string; type: string; grade: number; date: string }[]> = {
  1: [
    { subject: "Математика", type: "Контрольная", grade: 5, date: "27 мар" },
    { subject: "Физика", type: "Устный ответ", grade: 4, date: "26 мар" },
    { subject: "Химия", type: "Самостоятельная", grade: 3, date: "25 мар" },
    { subject: "Русский язык", type: "Диктант", grade: 5, date: "24 мар" },
  ],
  2: [
    { subject: "Биология", type: "Тест", grade: 5, date: "27 мар" },
    { subject: "Математика", type: "Контрольная", grade: 4, date: "25 мар" },
    { subject: "Английский язык", type: "Словарный диктант", grade: 3, date: "24 мар" },
    { subject: "Литература", type: "Сочинение", grade: 4, date: "22 мар" },
  ],
};

const attendanceData: Record<number, { day: string; status: "present" | "absent" | "late" }[]> = {
  1: [
    { day: "Пн", status: "present" },
    { day: "Вт", status: "present" },
    { day: "Ср", status: "late" },
    { day: "Чт", status: "present" },
    { day: "Пт", status: "present" },
  ],
  2: [
    { day: "Пн", status: "present" },
    { day: "Вт", status: "absent" },
    { day: "Ср", status: "present" },
    { day: "Чт", status: "present" },
    { day: "Пт", status: "present" },
  ],
};

const messages = [
  { from: "Козлов Д.Н.", subject: "Математика", text: "Пётр хорошо справился с контрольной.", date: "27 мар", unread: true },
  { from: "Белова О.И.", subject: "Химия", text: "Рекомендую дополнительные занятия по химии.", date: "25 мар", unread: true },
  { from: "Петрова А.В.", subject: "Русский язык", text: "Приглашаю на родительское собрание 3 апреля.", date: "23 мар", unread: false },
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

const attendanceColor: Record<string, string> = {
  present: "bg-emerald-500",
  absent: "bg-red-400",
  late: "bg-amber-400",
};
const attendanceLabel: Record<string, string> = {
  present: "Присутствовал",
  absent: "Отсутствовал",
  late: "Опоздал",
};

export default function ParentDashboard() {
  const [activeChild, setActiveChild] = useState(1);
  const child = children.find((c) => c.id === activeChild)!;
  const grades = gradesData[activeChild];
  const recent = recentData[activeChild];
  const attendance = attendanceData[activeChild];

  const gpa = (grades.reduce((s, x) => s + x.avg, 0) / grades.length).toFixed(2);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
      {/* Parent card */}
      <div className="bg-white border border-border rounded-lg p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--school-navy))] flex items-center justify-center text-white font-['Oswald'] text-2xl font-bold">
            НИ
          </div>
          <div>
            <h2 className="font-['Oswald'] text-xl font-semibold text-foreground">
              Иванова Наталья Михайловна
            </h2>
            <div className="text-sm text-muted-foreground mt-1">Родитель · {children.length} ребёнка</div>
          </div>
        </div>
        {/* Child selector */}
        <div className="flex gap-2">
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChild(c.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all ${
                activeChild === c.id
                  ? "border-[hsl(var(--school-navy))] bg-[hsl(var(--school-navy))] text-white"
                  : "border-border bg-white text-foreground hover:border-[hsl(var(--school-navy))]"
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-['Oswald'] ${
                activeChild === c.id ? "bg-white/20 text-white" : "bg-muted text-[hsl(var(--school-navy))]"
              }`}>
                {c.initials}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold">{c.name.split(" ")[1]}</div>
                <div className={`text-[10px] ${activeChild === c.id ? "text-white/70" : "text-muted-foreground"}`}>{c.class}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Child summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-1 bg-white border border-border rounded-lg p-5 flex flex-col items-center justify-center">
          <div className="font-['Oswald'] text-4xl font-bold text-[hsl(var(--school-navy))]">{gpa}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Средний балл</div>
        </div>
        {[
          { label: "Посещаемость", value: activeChild === 1 ? "94%" : "88%", icon: "CalendarCheck", color: "text-emerald-600" },
          { label: "Пропущено уроков", value: activeChild === 1 ? "3" : "6", icon: "CalendarX", color: "text-red-500" },
          { label: "Непрочитанных", value: String(messages.filter((m) => m.unread).length), icon: "MessageSquare", color: "text-blue-600" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white border border-border rounded-lg p-5 flex items-center gap-4">
            <div className={color}>
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
        {/* Grades */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-['Oswald'] text-base font-semibold uppercase tracking-wide text-foreground">
                Успеваемость — {child.name}
              </h3>
            </div>
            <div className="divide-y divide-border">
              {grades.map((s) => (
                <div key={s.subject} className="px-6 py-3.5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground mb-1.5">{s.subject}</div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${progressColor(s.progress)}`}
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground w-10 text-right shrink-0">{s.avg}</div>
                  <div className={`w-8 h-8 rounded border text-sm font-['Oswald'] font-semibold flex items-center justify-center shrink-0 ${gradeColor(s.grade)}`}>
                    {s.grade}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-white border border-border rounded-lg p-5">
            <h3 className="font-['Oswald'] text-sm font-semibold uppercase tracking-wide text-foreground mb-4">
              Посещаемость на этой неделе
            </h3>
            <div className="flex gap-3">
              {attendance.map((a) => (
                <div key={a.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className={`w-full h-2 rounded-full ${attendanceColor[a.status]}`} />
                  <span className="text-xs font-semibold text-foreground">{a.day}</span>
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">{attendanceLabel[a.status]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Recent grades */}
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-['Oswald'] text-base font-semibold uppercase tracking-wide text-foreground">
                Последние оценки
              </h3>
            </div>
            <div className="divide-y divide-border">
              {recent.map((g, i) => (
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

          {/* Messages from teachers */}
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-['Oswald'] text-base font-semibold uppercase tracking-wide text-foreground">
                Сообщения учителей
              </h3>
              {messages.filter((m) => m.unread).length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[hsl(var(--school-navy))] text-white text-[10px] font-bold flex items-center justify-center">
                  {messages.filter((m) => m.unread).length}
                </span>
              )}
            </div>
            <div className="divide-y divide-border">
              {messages.map((m, i) => (
                <div key={i} className={`px-5 py-3 ${m.unread ? "bg-blue-50/50" : ""}`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-[hsl(var(--school-navy))]">{m.from}</span>
                    <span className="text-[10px] text-muted-foreground">{m.date}</span>
                  </div>
                  <div className="text-xs text-foreground leading-relaxed">{m.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
