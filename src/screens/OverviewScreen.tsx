import { ScreenContainer, Card } from "../components/ui-elements";
import { ArrowRight, Clock, Target, Users } from "lucide-react";

export function OverviewScreen() {
  return (
    <ScreenContainer 
      title="Supply Chain Excellence CORSUSA" 
      subtitle="Plan de Proyecto basado en Lean Six Sigma (DMAIC)"
    >
      <Card className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between bg-primary text-white border-none shadow-md">
        <div>
          <h3 className="text-2xl font-light mb-2">Duración Estimada</h3>
          <p className="text-white/80">Tiempo total de ejecución del proyecto</p>
        </div>
        <div className="mt-4 md:mt-0 text-left md:text-right">
          <div className="text-4xl font-semibold">8 Semanas</div>
          <div className="text-sm font-medium uppercase tracking-widest text-primary-light bg-card inline-block px-3 py-1 rounded-full mt-2">
            + 1.5 Semanas Contingencia
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Target className="w-8 h-8 text-primary mb-4" />
          <h4 className="text-lg font-medium mb-2 text-primary">Objetivo Central</h4>
          <p className="text-text-muted leading-relaxed font-light text-sm">
            Optimizar la cadena de suministro identificando causas raíz de ineficiencias y aplicando soluciones estructurales, garantizando un impacto sostenible.
          </p>
        </Card>
        <Card>
          <Clock className="w-8 h-8 text-primary mb-4" />
          <h4 className="text-lg font-medium mb-2 text-primary">Ejecución Ágil</h4>
          <p className="text-text-muted leading-relaxed font-light text-sm">
            Balance entre Quick Wins (impacto rápido) y mejoras estructurales. Ejecución estructurada en sprints de trabajo.
          </p>
        </Card>
        <Card>
          <Users className="w-8 h-8 text-primary mb-4" />
          <h4 className="text-lg font-medium mb-2 text-primary">Enfoque Transversal</h4>
          <p className="text-text-muted leading-relaxed font-light text-sm">
            Alineación entre Compras, Almacén, Despacho y Customer Service, integrando a los stakeholders clave.
          </p>
        </Card>
      </div>
    </ScreenContainer>
  );
}
