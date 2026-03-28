import { useState } from "react";
import Icon from "@/components/ui/icon";

type Role = "student" | "teacher" | "parent";

interface Props {
  onLogin: () => void;
}

const roles: { id: Role; label: string; icon: string; desc: string }[] = [
  { id: "student", label: "Ученик", icon: "GraduationCap", desc: "Оценки и расписание" },
  { id: "teacher", label: "Учитель", icon: "BookOpenCheck", desc: "Журнал и классы" },
  { id: "parent", label: "Родитель", icon: "Users", desc: "Успеваемость детей" },
];

const roleContent: Record<Role, { title: string; subtitle: string; features: [string, string][] }> = {
  student: {
    title: "Личный кабинет ученика",
    subtitle: "Оценки, расписание и прогресс обучения — всё в одном месте",
    features: [["Оценки", "BookOpen"], ["Расписание", "Calendar"], ["Прогресс", "TrendingUp"]],
  },
  teacher: {
    title: "Кабинет учителя",
    subtitle: "Управление журналом, расписанием и успеваемостью классов",
    features: [["Журнал", "ClipboardList"], ["Классы", "Users"], ["Отчёты", "BarChart2"]],
  },
  parent: {
    title: "Кабинет родителя",
    subtitle: "Следите за успеваемостью и посещаемостью вашего ребёнка",
    features: [["Оценки", "Star"], ["Посещения", "CalendarCheck"], ["Связь", "MessageSquare"]],
  },
};

export default function LoginScreen({ onLogin }: Props) {
  const [role, setRole] = useState<Role>("student");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const content = roleContent[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--school-navy))]">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-14 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.4) 39px, rgba(255,255,255,0.4) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.4) 39px, rgba(255,255,255,0.4) 40px)`,
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--school-gold))] rounded flex items-center justify-center font-bold text-[hsl(var(--school-navy))] text-base">
              ШП
            </div>
            <span className="font-['Oswald'] text-white text-xl tracking-widest uppercase">
              Школьный портал
            </span>
          </div>
        </div>
        <div className="relative z-10">
          <h1
            key={role}
            className="font-['Oswald'] text-white text-5xl font-bold leading-tight mb-5 animate-fade-in"
          >
            {content.title.split(" ").map((w, i) => (
              <span key={i}>{w}<br /></span>
            ))}
          </h1>
          <p className="text-white/55 text-base leading-relaxed max-w-xs">{content.subtitle}</p>
        </div>
        <div className="relative z-10 flex gap-8">
          {content.features.map(([label, icon]) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded border border-white/20 flex items-center justify-center">
                <Icon name={icon} size={18} className="text-[hsl(var(--school-gold))]" />
              </div>
              <span className="text-white/50 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-[hsl(var(--background))] px-6">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-[hsl(var(--school-navy))] rounded flex items-center justify-center font-bold text-white text-sm">
              ШП
            </div>
            <span className="font-['Oswald'] text-[hsl(var(--school-navy))] text-lg tracking-widest uppercase">
              Школьный портал
            </span>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-8 p-1 bg-muted rounded-lg">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-md text-center transition-all ${
                  role === r.id
                    ? "bg-white shadow-sm text-[hsl(var(--school-navy))]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  name={r.icon}
                  size={18}
                  className={role === r.id ? "text-[hsl(var(--school-navy))]" : "text-muted-foreground"}
                />
                <span className="text-xs font-semibold">{r.label}</span>
                <span className="text-[10px] leading-tight opacity-70 hidden sm:block">{r.desc}</span>
              </button>
            ))}
          </div>

          <h2 className="font-['Oswald'] text-3xl font-semibold text-foreground mb-1">
            Вход в систему
          </h2>
          <p className="text-muted-foreground text-sm mb-7">
            {role === "student" && "Доступ к личному кабинету ученика"}
            {role === "teacher" && "Доступ к кабинету учителя"}
            {role === "parent" && "Доступ к кабинету родителя"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Логин
              </label>
              <div className="relative">
                <Icon name="User" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder={
                    role === "student" ? "ivanov.p" : role === "teacher" ? "petrova.av" : "ivanova.n"
                  }
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--school-navy))] focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Icon name="Mail" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    role === "student"
                      ? "ivanov@school.ru"
                      : role === "teacher"
                      ? "petrova@school.ru"
                      : "ivanova@mail.ru"
                  }
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--school-navy))] focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Пароль
              </label>
              <div className="relative">
                <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 border border-border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--school-navy))] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-[hsl(var(--school-navy))] hover:underline font-medium">
                Забыли пароль?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[hsl(var(--school-navy))] text-white font-['Oswald'] text-sm font-medium tracking-widest uppercase rounded-md hover:opacity-90 active:scale-[0.99] transition-all"
            >
              Войти как {roles.find((r) => r.id === role)?.label}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Муниципальное бюджетное общеобразовательное учреждение
          </p>
        </div>
      </div>
    </div>
  );
}
