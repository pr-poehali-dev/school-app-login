import Icon from "@/components/ui/icon";

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
const today = "Понедельник";

const schedule: Record<string, { time: string; subject: string; teacher: string; room: string; type?: string }[]> = {
  Понедельник: [
    { time: "08:00–08:45", subject: "Русский язык", teacher: "Петрова А.В.", room: "214" },
    { time: "08:55–09:40", subject: "Математика", teacher: "Козлов Д.Н.", room: "301", type: "Контрольная" },
    { time: "09:55–10:40", subject: "История", teacher: "Смирнова Т.С.", room: "118" },
    { time: "10:55–11:40", subject: "Физика", teacher: "Орлов В.П.", room: "205" },
    { time: "12:10–12:55", subject: "Английский язык", teacher: "Иванова М.Ю.", room: "115" },
    { time: "13:05–13:50", subject: "Литература", teacher: "Новикова Е.А.", room: "216" },
  ],
  Вторник: [
    { time: "08:00–08:45", subject: "Алгебра", teacher: "Козлов Д.Н.", room: "301" },
    { time: "08:55–09:40", subject: "Химия", teacher: "Белова О.И.", room: "112", type: "Лабораторная" },
    { time: "09:55–10:40", subject: "Биология", teacher: "Фёдорова Н.К.", room: "110" },
    { time: "10:55–11:40", subject: "Физкультура", teacher: "Громов С.Е.", room: "Спортзал" },
    { time: "12:10–12:55", subject: "Информатика", teacher: "Захаров И.Р.", room: "Каб. ИВТ" },
  ],
  Среда: [
    { time: "08:00–08:45", subject: "Геометрия", teacher: "Козлов Д.Н.", room: "301" },
    { time: "08:55–09:40", subject: "Русский язык", teacher: "Петрова А.В.", room: "214" },
    { time: "09:55–10:40", subject: "Обществознание", teacher: "Смирнова Т.С.", room: "118" },
    { time: "10:55–11:40", subject: "Английский язык", teacher: "Иванова М.Ю.", room: "115" },
    { time: "12:10–12:55", subject: "Физика", teacher: "Орлов В.П.", room: "205", type: "Лабораторная" },
    { time: "13:05–13:50", subject: "ОБЖ", teacher: "Карпов Г.С.", room: "109" },
  ],
  Четверг: [
    { time: "08:00–08:45", subject: "Математика", teacher: "Козлов Д.Н.", room: "301" },
    { time: "08:55–09:40", subject: "История", teacher: "Смирнова Т.С.", room: "118" },
    { time: "09:55–10:40", subject: "Химия", teacher: "Белова О.И.", room: "112" },
    { time: "10:55–11:40", subject: "Литература", teacher: "Новикова Е.А.", room: "216" },
    { time: "12:10–12:55", subject: "Физкультура", teacher: "Громов С.Е.", room: "Спортзал" },
  ],
  Пятница: [
    { time: "08:00–08:45", subject: "Биология", teacher: "Фёдорова Н.К.", room: "110" },
    { time: "08:55–09:40", subject: "Алгебра", teacher: "Козлов Д.Н.", room: "301", type: "Тест" },
    { time: "09:55–10:40", subject: "Русский язык", teacher: "Петрова А.В.", room: "214" },
    { time: "10:55–11:40", subject: "Обществознание", teacher: "Смирнова Т.С.", room: "118" },
    { time: "12:10–12:55", subject: "Английский язык", teacher: "Иванова М.Ю.", room: "115" },
  ],
};

const subjectColor: Record<string, string> = {
  "Русский язык": "bg-violet-50 border-l-violet-400",
  "Математика": "bg-blue-50 border-l-blue-500",
  "Алгебра": "bg-blue-50 border-l-blue-500",
  "Геометрия": "bg-blue-50 border-l-blue-500",
  "История": "bg-amber-50 border-l-amber-400",
  "Физика": "bg-cyan-50 border-l-cyan-500",
  "Химия": "bg-green-50 border-l-green-500",
  "Литература": "bg-rose-50 border-l-rose-400",
  "Биология": "bg-emerald-50 border-l-emerald-500",
  "Английский язык": "bg-indigo-50 border-l-indigo-400",
  "Физкультура": "bg-orange-50 border-l-orange-400",
  "Информатика": "bg-sky-50 border-l-sky-500",
  "Обществознание": "bg-yellow-50 border-l-yellow-500",
  "ОБЖ": "bg-gray-50 border-l-gray-400",
};

export default function Schedule() {
  const activeDay = today;

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-['Oswald'] text-2xl font-semibold uppercase tracking-wide text-foreground">
            Расписание уроков
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">10 «А» класс · 4 четверть · неделя 24–28 марта</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white border border-border rounded px-3 py-2">
          <Icon name="Calendar" size={14} />
          <span>2025–2026</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {days.map((day) => {
          const isToday = day === activeDay;
          const lessons = schedule[day] || [];
          return (
            <div key={day} className={`rounded-lg overflow-hidden border ${isToday ? "border-[hsl(var(--school-navy))]" : "border-border"}`}>
              <div className={`px-3 py-3 text-center ${isToday ? "bg-[hsl(var(--school-navy))] text-white" : "bg-white text-foreground border-b border-border"}`}>
                <div className={`font-['Oswald'] text-xs uppercase tracking-widest font-semibold ${isToday ? "text-white" : "text-foreground"}`}>
                  {day}
                </div>
                {isToday && (
                  <div className="text-[10px] text-[hsl(var(--school-gold))] mt-0.5 font-medium">Сегодня</div>
                )}
              </div>
              <div className="bg-white divide-y divide-border">
                {lessons.map((lesson, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2.5 border-l-2 ${subjectColor[lesson.subject] || "bg-gray-50 border-l-gray-300"}`}
                  >
                    <div className="text-[10px] text-muted-foreground mb-0.5 font-medium tabular-nums">
                      {lesson.time}
                    </div>
                    <div className="text-xs font-semibold text-foreground leading-tight mb-1">
                      {lesson.subject}
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-tight">
                      {lesson.teacher}
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Icon name="MapPin" size={9} />
                        <span>{lesson.room}</span>
                      </div>
                      {lesson.type && (
                        <span className="text-[9px] bg-[hsl(var(--school-navy))] text-white rounded px-1.5 py-0.5 font-medium leading-none">
                          {lesson.type}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {lessons.length === 0 && (
                  <div className="px-3 py-8 text-center text-xs text-muted-foreground">Выходной</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground mr-1">Обозначения:</span>
        {[
          { color: "bg-blue-500", label: "Математические" },
          { color: "bg-violet-400", label: "Языки" },
          { color: "bg-amber-400", label: "Гуманитарные" },
          { color: "bg-green-500", label: "Естественные науки" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
