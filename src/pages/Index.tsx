import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import Dashboard from "@/components/Dashboard";
import Schedule from "@/components/Schedule";

type Screen = "login" | "dashboard" | "schedule";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("login");

  if (screen === "login") {
    return <LoginScreen onLogin={() => setScreen("dashboard")} />;
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
              onClick={() => setScreen("dashboard")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                screen === "dashboard"
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Успеваемость
            </button>
            <button
              onClick={() => setScreen("schedule")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                screen === "schedule"
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Расписание
            </button>
          </nav>
          <button
            onClick={() => setScreen("login")}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Выйти
          </button>
        </div>
      </header>

      {screen === "dashboard" && <Dashboard onSchedule={() => setScreen("schedule")} />}
      {screen === "schedule" && <Schedule />}
    </div>
  );
}
