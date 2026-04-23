import { ScreenContainer, Card } from "../components/ui-elements";
import { Activity, BarChart2, CheckCircle2, ChevronRight, Eye, RefreshCw } from "lucide-react";

export function MethodologyScreen() {
  const phases = [
    { name: "Define", icon: Eye, color: "bg-blue-100 text-blue-700", desc: "Definir el problema, los objetivos y requerimientos de los clientes." },
    { name: "Measure", icon: BarChart2, color: "bg-indigo-100 text-indigo-700", desc: "Medir el desempeño actual del proceso." },
    { name: "Analyze", icon: Activity, color: "bg-purple-100 text-purple-700", desc: "Analizar el proceso para determinar las causas raíz de las variaciones." },
    { name: "Improve", icon: RefreshCw, color: "bg-fuchsia-100 text-fuchsia-700", desc: "Mejorar el proceso eliminando las causas raíz." },
    { name: "Control", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-700", desc: "Controlar el proceso mejorado y estandarizar." },
  ];

  return (
    <ScreenContainer title="Metodología DMAIC" subtitle="Data-driven y orientada a resultados">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-medium mb-4 text-primary">Pilares del Enfoque</h3>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="bg-primary/10 p-2 rounded-lg mt-1"><BarChart2 className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-medium text-text-main">Data-driven</h4>
                <p className="text-sm font-light text-text-muted">Decisiones fundamentadas en métricas y análisis cuantitativo de la operación.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="bg-primary/10 p-2 rounded-lg mt-1"><Activity className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-medium text-slate-800">Enfoque en Causa Raíz</h4>
                <p className="text-sm font-light text-slate-500">Identificación y solución de problemas estructurales, no solo síntomas superficiales.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="bg-primary/10 p-2 rounded-lg mt-1"><RefreshCw className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-medium text-slate-800">Balance de Mejoras</h4>
                <p className="text-sm font-light text-slate-500">Ejecución combinada de Quick Wins (resultados inmediatos) y estrategias a largo plazo.</p>
              </div>
            </li>
          </ul>
        </div>

        <Card className="bg-surface border-dashed border-2">
          <h3 className="text-xl font-medium mb-6 text-primary flex items-center gap-2">
            El Ciclo DMAIC
          </h3>
          <div className="space-y-3">
            {phases.map((phase, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-card p-3 rounded-lg shadow-sm">
                <div className={`p-2 rounded-md ${phase.color}`}>
                  <phase.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{phase.name}</div>
                  <div className="text-xs text-slate-500">{phase.desc}</div>
                </div>
                {idx < phases.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ScreenContainer>
  );
}
