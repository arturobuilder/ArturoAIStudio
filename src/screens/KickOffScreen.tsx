import { ScreenContainer, Card } from "../components/ui-elements";
import { Flag, CheckSquare, FileText } from "lucide-react";

export function KickOffScreen() {
  return (
    <ScreenContainer title="Kick Off" subtitle="Alineación inicial y lanzamiento del proyecto">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-t-4 border-t-primary">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg"><Flag className="w-6 h-6 text-primary" /></div>
            <h3 className="text-xl font-medium text-text-main">Actividades</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-sm text-text-muted">Reunión de Kick Off (Lanzamiento oficial)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-600">Validación y cierre de alcance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-600">Identificación y alineación de stakeholders clave</span>
            </li>
          </ul>
        </Card>

        <Card className="border-t-4 border-t-purple-400">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg"><FileText className="w-6 h-6 text-purple-700" /></div>
            <h3 className="text-xl font-medium text-slate-800">Entregables</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 bg-surface p-3 rounded-lg border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-slate-700">Plan de trabajo detallado</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-slate-700">Matriz de Stakeholders</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-slate-700">Cronograma validado</span>
            </li>
          </ul>
        </Card>
      </div>
    </ScreenContainer>
  );
}
