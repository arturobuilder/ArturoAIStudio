import { ScreenContainer, Card } from "../components/ui-elements";
import { ShieldAlert, Info } from "lucide-react";

export function ContingencyScreen() {
  return (
    <ScreenContainer title="Contingencia" subtitle="Reserva estratégica de tiempo y esfuerzo">
      <Card className="border-orange-200 bg-orange-50/50 shadow-none mt-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-orange-100 p-6 rounded-full shrink-0">
            <ShieldAlert className="w-12 h-12 text-orange-600" />
          </div>
          <div>
            <h3 className="text-2xl font-light text-text-main mb-2">1.5 Semanas de Buffer</h3>
            <p className="text-text-muted leading-relaxed font-light mb-4">
              Reserva de tiempo diseñada específicamente para absorber desviaciones imprevistas del proyecto, retrasos en la entrega de información, o problemas operativos críticos que dificulten la ejecución del cronograma original.
            </p>
            
            <div className="flex bg-card border border-orange-100 p-3 rounded-lg gap-3 items-start">
              <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 font-medium">Se activa solo si es estrictamente necesario, bajo previa confirmación mutua.</p>
            </div>
          </div>
        </div>
      </Card>
    </ScreenContainer>
  );
}
