import React, { createContext, useContext, useState, ReactNode } from "react";
import { 
  Network, Search, Target, LayoutList, 
  ShoppingCart, Box, Headset, Shapes, 
  LineChart, LayoutDashboard, Route, FileText, UsersRound 
} from "lucide-react";

export type Status = "Pendiente" | "En Progreso" | "Completado";

export interface Attachment {
  id: string;
  name: string;
  size: number;
}

export interface Deliverable {
  id: string;
  phaseId: string;
  areaId?: string;
  title: string;
  description: string;
  attachments: Attachment[];
  status: Status;
  icon: any;
  color: { bg: string; text: string; tint?: string; border?: string };
}

export const INITIAL_DELIVERABLES: Deliverable[] = [
  // Phase 1
  { id: "p1-vsm-as-is", phaseId: "phase1", title: "VSM As-Is", description: "", attachments: [], status: "Pendiente", icon: Network, color: { bg: "bg-blue-100", text: "text-blue-700", tint: "bg-blue-50/50" } },
  { id: "p1-diagnostico", phaseId: "phase1", title: "Diagnóstico Analítico", description: "", attachments: [], status: "Pendiente", icon: Search, color: { bg: "bg-indigo-100", text: "text-indigo-700", tint: "bg-indigo-50/50" } },
  { id: "p1-vsm-to-be", phaseId: "phase1", title: "VSM To-Be", description: "", attachments: [], status: "Pendiente", icon: Target, color: { bg: "bg-purple-100", text: "text-purple-700", tint: "bg-purple-50/50" } },
  { id: "p1-portafolio", phaseId: "phase1", title: "Portafolio de Iniciativas", description: "Iniciativas priorizadas tras la evaluación de Impacto vs Esfuerzo.", attachments: [], status: "Pendiente", icon: LayoutList, color: { bg: "bg-primary/20", text: "text-primary", tint: "bg-primary/5" } },

  // Phase 2 - Compras
  { id: "p2-c1", phaseId: "phase2", areaId: "compras", title: "Segmentación de SKUs", description: "Clasificación ABC/XYZ de los SKUs actuales para definir políticas óptimas.", attachments: [], status: "En Progreso", icon: ShoppingCart, color: { bg: "bg-indigo-50", text: "text-indigo-700", tint: "bg-indigo-50/50" } },
  { id: "p2-c2", phaseId: "phase2", areaId: "compras", title: "Estrategias de sourcing", description: "Desarrollo de estrategias para proveedores críticos.", attachments: [], status: "Pendiente", icon: ShoppingCart, color: { bg: "bg-indigo-50", text: "text-indigo-700", tint: "bg-indigo-50/50" } },
  { id: "p2-c3", phaseId: "phase2", areaId: "compras", title: "Jerarquía de aprobaciones", description: "Estandarización de flujos de aprobación y límites.", attachments: [], status: "Pendiente", icon: ShoppingCart, color: { bg: "bg-indigo-50", text: "text-indigo-700", tint: "bg-indigo-50/50" } },
  
  // Phase 2 - Almacén
  { id: "p2-a1", phaseId: "phase2", areaId: "almacen", title: "Layout básico y Slotting", description: "Optimización de las ubicaciones físicas según frecuencia de uso.", attachments: [], status: "En Progreso", icon: Box, color: { bg: "bg-violet-50", text: "text-violet-700", tint: "bg-violet-50/50" } },
  { id: "p2-a2", phaseId: "phase2", areaId: "almacen", title: "Picking estandarizado", description: "Formatos y flujos para el proceso de recolección.", attachments: [], status: "Pendiente", icon: Box, color: { bg: "bg-violet-50", text: "text-violet-700", tint: "bg-violet-50/50" } },
  { id: "p2-a3", phaseId: "phase2", areaId: "almacen", title: "Conteos cíclicos", description: "Cronograma e instructivo de conteo por clasificación ABC.", attachments: [], status: "Pendiente", icon: Box, color: { bg: "bg-violet-50", text: "text-violet-700", tint: "bg-violet-50/50" } },
  
  // Phase 2 - Customer Service
  { id: "p2-cx1", phaseId: "phase2", areaId: "cx", title: "Segmentación de clientes", description: "Definición de clusters de clientes y su tratamiento preferencial.", attachments: [], status: "Completado", icon: Headset, color: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", tint: "bg-fuchsia-50/50" } },
  { id: "p2-cx2", phaseId: "phase2", areaId: "cx", title: "Order-to-Delivery", description: "Mapeo detallado de tiempos y responsables por etapa.", attachments: [], status: "En Progreso", icon: Headset, color: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", tint: "bg-fuchsia-50/50" } },
  { id: "p2-cx3", phaseId: "phase2", areaId: "cx", title: "ATP Básico", description: "Visibilidad de Available-to-Promise para asesores comerciales.", attachments: [], status: "Pendiente", icon: Headset, color: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", tint: "bg-fuchsia-50/50" } },
  
  // Phase 2 - Transversales
  { id: "p2-t1", phaseId: "phase2", areaId: "transversales", title: "VSM To-Be", description: "Value Stream Map del modelo operativo propuesto.", attachments: [], status: "Pendiente", icon: Shapes, color: { bg: "bg-slate-100", text: "text-slate-700", tint: "bg-slate-50" } },
  { id: "p2-t2", phaseId: "phase2", areaId: "transversales", title: "Organigrama To-Be", description: "Estructura organizacional sugerida.", attachments: [], status: "En Progreso", icon: Shapes, color: { bg: "bg-slate-100", text: "text-slate-700", tint: "bg-slate-50" } },
  { id: "p2-t3", phaseId: "phase2", areaId: "transversales", title: "RACI chart To-Be", description: "Matriz de roles y responsabilidades ajustada.", attachments: [], status: "Pendiente", icon: Shapes, color: { bg: "bg-slate-100", text: "text-slate-700", tint: "bg-slate-50" } },
  { id: "p2-t4", phaseId: "phase2", areaId: "transversales", title: "Perfiles de puesto To-Be", description: "Actualización de requerimientos para roles clave.", attachments: [], status: "Pendiente", icon: Shapes, color: { bg: "bg-slate-100", text: "text-slate-700", tint: "bg-slate-50" } },

  // Phase 3
  { id: "p3-kpis", phaseId: "phase3", title: "KPIs Definidos", description: "Indicadores clave de rendimiento y umbrales de alerta documentados.", attachments: [], status: "Pendiente", icon: LineChart, color: { bg: "bg-emerald-100", text: "text-emerald-700", tint: "bg-emerald-50/50" } },
  { id: "p3-dashboards", phaseId: "phase3", title: "Dashboards", description: "Mockups y plantillas para la visualización de la salud de la operación en tiempo real.", attachments: [], status: "Pendiente", icon: LayoutDashboard, color: { bg: "bg-indigo-100", text: "text-indigo-700", tint: "bg-indigo-50/50" } },
  { id: "p3-roadmap", phaseId: "phase3", title: "Roadmap", description: "Plan de trabajo detallado para iniciativas a mediano y largo plazo.", attachments: [], status: "Pendiente", icon: Route, color: { bg: "bg-sky-100", text: "text-sky-700", tint: "bg-sky-50/50" } },
  { id: "p3-informe", phaseId: "phase3", title: "Informe Final", description: "Documentación de cierre formal del proyecto mostrando los resultados obtenidos.", attachments: [], status: "Pendiente", icon: FileText, color: { bg: "bg-rose-100", text: "text-rose-700", tint: "bg-rose-50/50" } },
  { id: "p3-gobernanza", phaseId: "phase3", title: "Gobernanza", description: "Matrices RACI, roles y pautas de continuidad para el equipo interno.", attachments: [], status: "Pendiente", icon: UsersRound, color: { bg: "bg-amber-100", text: "text-amber-700", tint: "bg-amber-50/50" } },
];

interface DeliverablesContextType {
  deliverables: Deliverable[];
  updateDeliverable: (id: string, updates: Partial<Deliverable>) => void;
  getDeliverablesByPhase: (phaseId: string) => Deliverable[];
}

const DeliverablesContext = createContext<DeliverablesContextType | undefined>(undefined);

export function DeliverablesProvider({ children }: { children: ReactNode }) {
  const [deliverables, setDeliverables] = useState<Deliverable[]>(INITIAL_DELIVERABLES);

  const updateDeliverable = (id: string, updates: Partial<Deliverable>) => {
    setDeliverables(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const getDeliverablesByPhase = (phaseId: string) => {
    return deliverables.filter(d => d.phaseId === phaseId);
  };

  return (
    <DeliverablesContext.Provider value={{ deliverables, updateDeliverable, getDeliverablesByPhase }}>
      {children}
    </DeliverablesContext.Provider>
  );
}

export function useDeliverables() {
  const context = useContext(DeliverablesContext);
  if (!context) {
    throw new Error("useDeliverables must be used within a DeliverablesProvider");
  }
  return context;
}
