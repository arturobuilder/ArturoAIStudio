import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Menu, X, Briefcase, ChevronRight, Moon, Sun } from "lucide-react";
import { DeliverablesProvider } from "./context/DeliverablesContext";

import { OverviewScreen } from "./screens/OverviewScreen";
import { MethodologyScreen } from "./screens/MethodologyScreen";
import { PlanScreen } from "./screens/PlanScreen";
import { KickOffScreen } from "./screens/KickOffScreen";
import { Phase1Screen } from "./screens/Phase1Screen";
import { Phase2Screen } from "./screens/Phase2Screen";
import { Phase3Screen } from "./screens/Phase3Screen";
import { ContingencyScreen } from "./screens/ContingencyScreen";
import { DeliverablesScreen } from "./screens/DeliverablesScreen";
import { CommercialScreen } from "./screens/CommercialScreen";

const SCREENS = [
  { id: "overview", label: "Overview", component: OverviewScreen },
  { id: "dmaic", label: "Metodología DMAIC", component: MethodologyScreen },
  { id: "plan", label: "Plan del Proyecto", component: PlanScreen },
  { id: "kickoff", label: "Kick Off", component: KickOffScreen },
  { id: "phase1", label: "Fase 1 – Diseño", component: Phase1Screen },
  { id: "phase2", label: "Fase 2 – Ejecución", component: Phase2Screen },
  { id: "phase3", label: "Fase 3 – Control", component: Phase3Screen },
  { id: "contingency", label: "Contingencia", component: ContingencyScreen },
  { id: "deliverables", label: "Entregables por Fase", component: DeliverablesScreen },
  { id: "commercial", label: "Condiciones Comerciales", component: CommercialScreen },
];

export default function App() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const ActiveComponent = SCREENS[activeScreenIndex].component;

  const navigateTo = (index: number) => {
    setActiveScreenIndex(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <DeliverablesProvider>
      <div className="flex h-screen w-full bg-surface overflow-hidden font-sans transition-colors duration-300">
        
        {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-72 bg-card border-r border-slate-200 dark:border-slate-800 shadow-sm flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
               <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm text-primary tracking-wide">CORSUSA</div>
              <div className="text-xs text-text-muted">Supply Chain Excellence</div>
            </div>
          </div>
          <button className="md:hidden text-text-muted" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {SCREENS.map((screen, idx) => {
            const isActive = idx === activeScreenIndex;
            return (
              <button
                key={screen.id}
                onClick={() => navigateTo(idx)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200
                  ${isActive 
                    ? "bg-primary/5 text-primary font-medium" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-light"
                  }
                `}
              >
                <span>{screen.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
              </button>
            )
          })}
        </nav>
        
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-muted font-medium">Dark Mode</span>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-1.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-xs text-text-muted mb-2 flex justify-between">
            <span>Progreso</span>
            <span>{Math.round(((activeScreenIndex + 1) / SCREENS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((activeScreenIndex + 1) / SCREENS.length) * 100}%` }}
            ></div>
          </div>
        </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-stretch overflow-hidden relative bg-surface">
          {/* Mobile Navbar */}
          <header className="md:hidden flex items-center px-6 py-4 bg-card border-b border-slate-200 dark:border-slate-800 z-30">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-slate-600 hover:text-slate-900"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 font-medium text-primary text-sm line-clamp-1">{SCREENS[activeScreenIndex].label}</span>
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            <ActiveComponent key={activeScreenIndex} />
          </AnimatePresence>
          
            {/* Next/Prev Navigation Buttons inside content area */}
            <div className="max-w-5xl mx-auto w-full mt-12 flex justify-between items-center border-t border-slate-200 dark:border-slate-800 pt-8 pb-8">
              <button 
                onClick={() => navigateTo(Math.max(0, activeScreenIndex - 1))}
                disabled={activeScreenIndex === 0}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeScreenIndex === 0 ? "opacity-0 cursor-default" : "text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                Anterior
              </button>
              
              <button 
                onClick={() => navigateTo(Math.min(SCREENS.length - 1, activeScreenIndex + 1))}
                disabled={activeScreenIndex === SCREENS.length - 1}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeScreenIndex === SCREENS.length - 1 ? "opacity-0 cursor-default" : "bg-primary text-white hover:bg-primary-light shadow-sm"}`}
              >
                Siguiente Sección
              </button>
            </div>
          </div>
        </main>

      </div>
    </DeliverablesProvider>
  );
}
