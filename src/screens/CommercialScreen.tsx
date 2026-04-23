import { ScreenContainer, Card } from "../components/ui-elements";
import { CheckCircle2 } from "lucide-react";

export function CommercialScreen() {
  return (
    <ScreenContainer title="Condiciones Comerciales" subtitle="Estructura de inversión del proyecto">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* Total Fee Card */}
        <Card className="bg-primary text-white border-none shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             {/* Decorative element */}
             <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-light text-white/80 mb-2">Inversión Total</h3>
            <div className="text-4xl font-semibold mb-1 flex items-baseline gap-2">
              <span>USD 22,923</span>
              <span className="text-xl font-light text-primary-light">+ IGV</span>
            </div>
          </div>
        </Card>

        {/* Contingency */}
        <Card className="border-dashed border-2 border-slate-300">
          <h3 className="text-xl font-medium text-text-main mb-2">Reserva de Contingencia</h3>
          <div className="text-2xl font-semibold text-slate-700 mb-1 flex items-baseline gap-2">
            <span>USD 4,300</span>
            <span className="text-sm font-light text-text-muted">+ IGV</span>
          </div>
          <p className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 inline-block px-2 py-1 rounded mt-2">
            Solo se factura si se utiliza, bajo aprobación.
          </p>
        </Card>

        {/* Milestones */}
        <Card className="md:col-span-2">
          <h3 className="text-xl font-medium text-slate-800 mb-6">Cronograma de Valorización</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface p-4 rounded-xl border border-slate-100 relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Kick Off</div>
              <div className="text-2xl text-primary font-light">10%</div>
              <CheckCircle2 className="w-5 h-5 text-slate-300 absolute top-4 right-4" />
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Fase 1: Diseño</div>
              <div className="text-2xl text-primary font-light">30%</div>
              <CheckCircle2 className="w-5 h-5 text-slate-300 absolute top-4 right-4" />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Fase 2: Ejecución</div>
              <div className="text-2xl text-primary font-light">40%</div>
              <CheckCircle2 className="w-5 h-5 text-slate-300 absolute top-4 right-4" />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Fase 3: Control</div>
              <div className="text-2xl text-primary font-light">20%</div>
              <CheckCircle2 className="w-5 h-5 text-slate-300 absolute top-4 right-4" />
            </div>
          </div>
        </Card>

      </div>
    </ScreenContainer>
  );
}
