import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import Dashboard from "@/components/Dashboard";
import Schedule from "@/components/Schedule";
import TeacherDashboard from "@/components/TeacherDashboard";
import ParentDashboard from "@/components/ParentDashboard";
import Icon from "@/components/ui/icon";

type Role = "student" | "teacher" | "parent";
type Screen = "login" | "main" | "schedule";

const navByRole: Record<Role, { main: string; schedule?: string }> = {
  student: { main: "Успеваемость", schedule: "Расписание" },
  teacher: { main: "Кабинет учителя" },
  parent: { main: "Кабинет родителя" },
};

export default function Index() {
  const [screen, setScreen] = useState<Screen>("login");
  const [role, setRole] = useState<Role>("student");

  if (screen === "login") {
    return (
      <LoginScreen
        onLogin={(r: Role) => {
          setRole(r);
          setScreen("main");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[hsl(var(--school-navy))] text-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[hsl(var(--school-gold))] rounded flex items-center justify-center font-bold text-[hsl(var(--school-navy))] text-sm">
              ШП
            </div>
            <span className="font-['Oswald'] text-lg tracking-wide uppercase">Школьный портал</span>
          </div>
          <nav className="flex gap-1">
            <button
              onClick={() => setScreen("main")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                screen === "main" ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {navByRole[role].main}
            </button>
            {role === "student" && (
              <button
                onClick={() => setScreen("schedule")}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  screen === "schedule" ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Расписание
              </button>
            )}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Icon name={role === "student" ? "GraduationCap" : role === "teacher" ? "BookOpenCheck" : "Users"} size={15} />
              <span>{role === "student" ? "Ученик" : role === "teacher" ? "Учитель" : "Родитель"}</span>
            </div>
            <button
              onClick={() => setScreen("login")}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      {screen === "main" && role === "student" && <Dashboard onSchedule={() => setScreen("schedule")} />}
      {screen === "main" && role === "teacher" && <TeacherDashboard />}
      {screen === "main" && role === "parent" && <ParentDashboard />}
      {screen === "schedule" && role === "student" && <Schedule />}
    </div>
  );
}
