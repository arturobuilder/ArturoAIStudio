import { ScreenContainer, Card } from "../components/ui-elements";
import { Flag, Presentation, CheckCircle, ShieldAlert } from "lucide-react";

export function PlanScreen() {
  return (
    <ScreenContainer title="Plan del Proyecto" subtitle="Cronograma general e hitos principales">
      <Card className="mb-8 pt-8 pb-32 overflow-x-auto relative">
        <div className="min-w-[800px] px-10 relative mt-4">
          
          {/* Timeline Container */}
          <div className="flex w-full items-start">
            
            {/* Main 8 Weeks Track (85%) */}
            <div className="w-[85%] relative">
              
              {/* Phase Bars */}
              <div className="flex w-full h-14 rounded-l-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
                 <div className="w-[37.5%] bg-purple-100 flex items-center justify-center border-r-[3px] border-white relative group">
                   <span className="text-purple-800 text-sm font-medium">Fase 1: Diseño (3 Sem)</span>
                   <div className="absolute inset-0 bg-purple-200 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                 </div>
                 <div className="w-[50%] bg-primary flex items-center justify-center border-r-[3px] border-white relative group">
                   <span className="text-white text-sm font-medium">Fase 2: Ejecución (4 Sem)</span>
                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                 </div>
                 <div className="w-[12.5%] bg-emerald-500 flex items-center justify-center relative group">
                   <span className="text-white text-[13px] font-medium leading-tight text-center">F3 <br/>(1S)</span>
                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                 </div>
              </div>

              {/* Milestones */}
              <div className="absolute top-[28px] left-[0%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                 <div className="w-10 h-10 rounded-full bg-card border-[4px] border-slate-300 flex items-center justify-center shadow-md">
                   <Flag className="w-5 h-5 text-text-muted" />
                 </div>
                 <div className="absolute top-12 w-32 text-center">
                   <div className="text-sm font-bold text-slate-700">Kick Off</div>
                   <div className="text-xs text-slate-500 font-light mt-1">Reunión Inicial</div>
                 </div>
              </div>

              <div className="absolute top-[28px] left-[37.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                 <div className="w-10 h-10 rounded-full bg-white border-[4px] border-purple-300 flex items-center justify-center shadow-md">
                   <Presentation className="w-5 h-5 text-purple-600" />
                 </div>
                 <div className="absolute top-12 w-36 text-center">
                   <div className="text-sm font-bold text-purple-800">Cierre Fase 1</div>
                   <div className="text-xs text-purple-600/80 font-light mt-1">Validación Diseño</div>
                 </div>
              </div>

              <div className="absolute top-[28px] left-[87.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                 <div className="w-10 h-10 rounded-full bg-white border-[4px] border-primary flex items-center justify-center shadow-md">
                   <Presentation className="w-5 h-5 text-primary" />
                 </div>
                 <div className="absolute top-12 w-36 text-center">
                   <div className="text-sm font-bold text-primary">Cierre Fase 2</div>
                   <div className="text-xs text-primary/80 font-light mt-1">Validación Ejecución</div>
                 </div>
              </div>

              <div className="absolute top-[28px] left-[100%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                 <div className="w-10 h-10 rounded-full bg-emerald-500 border-[4px] border-white flex items-center justify-center shadow-md">
                   <CheckCircle className="w-5 h-5 text-white" />
                 </div>
                 <div className="absolute top-12 w-36 text-center">
                   <div className="text-sm font-bold text-emerald-600">Cierre Proyecto</div>
                   <div className="text-xs text-slate-500 font-light mt-1">Presentación Ejecutiva</div>
                 </div>
              </div>

            </div>

            {/* Contingency Track (15%) */}
            <div className="w-[15%] pl-4 relative">
              <div className="flex w-full h-14 bg-orange-50 border-dashed border-[2px] border-orange-300 rounded-lg flex items-center justify-center shadow-sm">
                 <div className="flex flex-col items-center">
                   <span className="text-orange-700 text-xs font-semibold uppercase tracking-wider">Buffer</span>
                   <span className="text-orange-600 text-[10px] font-medium">+1.5 Semanas</span>
                 </div>
              </div>
              <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[10px] text-orange-500 font-medium flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-orange-100">
                <ShieldAlert className="w-3 h-3" /> Contingencia
              </div>
            </div>

          </div>

        </div>
      </Card>
      
      {/* Notes underneath */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="bg-primary/5 border-primary/10">
            <h4 className="text-primary font-medium flex items-center gap-2 mb-2"><Flag className="w-5 h-5"/> El Kick Off</h4>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              Funciona como el hito "Día 0" de alineación. Aquí se definen oficialmente los alcances y stakeholders antes de iniciar la carga operativa de las semanas de diseño.
            </p>
         </Card>
         <Card className="bg-emerald-50 border-emerald-100">
            <h4 className="text-emerald-700 font-medium flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5"/> Entregas e Hitos</h4>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Al finalizar cada fase principal, se convoca a una sesión ejecutiva formal (Hito) para validar de conjunta los entregables y asegurar una transición limpia a la siguiente etapa.
            </p>
         </Card>
      </div>
    </ScreenContainer>
  );
}
