import * as React from "react";
import { useState, useRef } from "react";
import { ScreenContainer, Card } from "../components/ui-elements";
import { CheckCircle, Zap, Box, ShoppingCart, Headset, Shapes, AlignLeft, Paperclip, X, Clock, LayoutList, Upload, File, Trash2, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDeliverables, Deliverable, Attachment, Status } from "../context/DeliverablesContext";

const AREAS = [
  { id: "compras", title: "Compras", icon: ShoppingCart, color: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", tint: "bg-indigo-50/50" } },
  { id: "almacen", title: "Almacén", icon: Box, color: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", tint: "bg-violet-50/50" } },
  { id: "cx", title: "Customer Svc", icon: Headset, color: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-200", tint: "bg-fuchsia-50/50" } },
  { id: "transversales", title: "Transversales", icon: Shapes, color: { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-700", border: "border-slate-200 dark:border-slate-800", tint: "bg-surface" } }
];

export function Phase2Screen() {
  const { getDeliverablesByPhase, updateDeliverable } = useDeliverables();
  const deliverables = getDeliverablesByPhase("phase2");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeItem = deliverables.find(d => d.id === selectedId);
  const activeArea = AREAS.find(a => a.id === activeItem?.areaId);

  const updateActiveItem = (updates: Partial<Deliverable>) => {
    if (!selectedId) return;
    updateDeliverable(selectedId, updates);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && activeItem) {
      const filesArray = Array.from(e.target.files) as File[];
      const newAttachments: Attachment[] = filesArray.map(f => ({
        id: Math.random().toString(36).substring(7),
        name: f.name,
        size: f.size
      }));
      updateActiveItem({ attachments: [...activeItem.attachments, ...newAttachments] });
    }
  };

  const removeAttachment = (attId: string) => {
    if (!activeItem) return;
    updateActiveItem({ attachments: activeItem.attachments.filter(a => a.id !== attId) });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <ScreenContainer title="Fase 2 – Ejecución (4 semanas)" subtitle="Analyze – Improve">
      
      {/* Enfoque y Nota Clave */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1 border-l-4 border-l-primary">
          <h3 className="text-lg font-medium text-text-main mb-4">Enfoque</h3>
          <ul className="space-y-3">
            <li className="flex gap-2 items-start"><Zap className="w-5 h-5 text-amber-500 shrink-0" /><span className="text-sm text-text-muted">Implementación de Quick Wins</span></li>
            <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-primary shrink-0" /><span className="text-sm text-text-muted">Trabajo ágil en Sprints</span></li>
          </ul>
        </Card>

        <Card className="md:col-span-2 bg-primary text-white border-none shadow-lg flex items-center">
          <div className="text-base font-light leading-relaxed">
            <span className="font-semibold block mb-1">Nota Clave:</span>
            A continuación se presenta el tablero kanban de entregables seleccionados para cada frente. Haz clic sobre cada iniciativa para cargar evidencia, documentación de sustento o actualizar su estatus.
          </div>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {AREAS.map(area => {
          const areaDeliverables = deliverables.filter(d => d.areaId === area.id);
          
          return (
            <div key={area.id} className="flex flex-col gap-3 rounded-xl bg-slate-50 border border-slate-200 p-3">
              {/* Column Header */}
              <div className={`p-3 rounded-lg flex items-center gap-2 border ${area.color.bg} ${area.color.text} ${area.color.border}`}>
                <area.icon className="w-5 h-5 shrink-0" />
                <h4 className="font-semibold text-sm truncate">{area.title}</h4>
                <div className="ml-auto bg-card/50 px-2 py-0.5 rounded-full text-xs font-bold">
                  {areaDeliverables.length}
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {areaDeliverables.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedId(item.id)}
                    className="bg-white border border-slate-200 rounded-lg p-3 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2 rounded-lg ${area.color.bg} ${area.color.text}`}>
                        <area.icon className="w-4 h-4" />
                      </div>
                      <div className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full
                        ${item.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' : 
                          item.status === 'En Progreso' ? 'bg-blue-100 text-blue-700' : 
                          'bg-slate-100 text-text-muted'}
                      `}>
                        {item.status}
                      </div>
                    </div>
                    
                    <h5 className="text-sm font-medium text-slate-800 leading-snug mb-3">
                      {item.title}
                    </h5>

                    <div className="flex justify-start gap-3 mt-auto text-slate-400 dark:text-slate-500">
                      {item.description && <AlignLeft className="w-3.5 h-3.5" />}
                      {item.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>{item.attachments.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sugerencias sutiles / Backlog */}
      <div className="bg-white border rounded-xl p-5 mb-8 text-sm border-dashed border-slate-300">
        <h4 className="font-medium text-text-muted flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Ideas adicionales / Backlog sugerido
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-500 font-light text-xs">
          <div>
             <strong className="text-slate-700 block mb-1">Compras:</strong>
             <ul className="list-disc list-inside space-y-1">
               <li>Políticas Procure-to-Stock</li>
               <li>Supplier scorecards</li>
               <li>Homologación de proveedores</li>
               <li>Contratos marco (Blanket orders)</li>
               <li>Kardex de riesgos de suministro</li>
             </ul>
          </div>
          <div>
             <strong className="text-slate-700 block mb-1">Almacén:</strong>
             <ul className="list-disc list-inside space-y-1">
               <li>Productividad operativa</li>
               <li>Slotting dinámico</li>
               <li>Surtido por olas (Wave picking)</li>
               <li>Diseño de Cross-docking</li>
             </ul>
          </div>
          <div>
             <strong className="text-slate-700 block mb-1">Customer Service:</strong>
             <ul className="list-disc list-inside space-y-1">
               <li>SLAs por segmento</li>
               <li>Gestión de Backorders</li>
               <li>Encuestas CSAT/NPS estructuradas</li>
               <li>Portal de autoservicio B2B</li>
             </ul>
          </div>
          <div>
             <strong className="text-slate-700 block mb-1">Transversales:</strong>
             <ul className="list-disc list-inside space-y-1">
               <li>Programa de ideas (Kaizen)</li>
               <li>Gestión visual (Daily Huddles)</li>
               <li>Matriz de polivalencia</li>
             </ul>
          </div>
        </div>
      </div>

      {/* Trello-like Modal */}
      <AnimatePresence>
        {selectedId && activeItem && activeArea && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
               onClick={() => setSelectedId(null)}
               className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
             />
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
               className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
             >
               <div className={`flex p-6 border-b border-slate-100 justify-between items-start ${activeArea.color.tint}`}>
                 <div className="flex items-center gap-3 w-full">
                   <div className={`p-2.5 rounded-xl bg-white shadow-sm text-slate-600 shrink-0`}>
                     <activeArea.icon className="w-5 h-5" />
                   </div>
                   <div className="flex-1 w-full min-w-0 pr-4">
                     <input 
                       value={activeItem.title}
                       onChange={(e) => updateActiveItem({ title: e.target.value })}
                       className="text-xl font-semibold text-slate-800 bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-primary focus:outline-none transition-colors w-full px-1 -ml-1 text-ellipsis"
                     />
                     <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5 px-1">{activeArea.title}</p>
                   </div>
                 </div>
                 <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-500 bg-white shadow-sm border border-slate-200">
                   <X className="w-4 h-4" />
                 </button>
               </div>

               <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8 custom-scrollbar">
                 {/* Main Content Area */}
                 <div className="flex-1 space-y-8">
                   {/* Description */}
                   <div className="space-y-3">
                     <div className="flex items-center gap-2 text-slate-700 font-medium">
                       <AlignLeft className="w-5 h-5" />
                       <h3>Descripción</h3>
                     </div>
                     <textarea 
                       value={activeItem.description}
                       onChange={(e) => updateActiveItem({ description: e.target.value })}
                       placeholder="Agrega una descripción o notas de avance..."
                       className="w-full min-h-[100px] p-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y text-sm text-slate-600 bg-slate-50 focus:bg-white custom-scrollbar"
                     />
                   </div>

                   {/* Attachments */}
                   <div className="space-y-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 text-slate-700 font-medium">
                         <Paperclip className="w-5 h-5 text-slate-600" />
                         <h3>Adjuntos</h3>
                       </div>
                       <button 
                         onClick={() => fileInputRef.current?.click()}
                         className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md font-medium transition-colors"
                       >
                         Añadir archivo
                       </button>
                       <input 
                         type="file" 
                         ref={fileInputRef} 
                         onChange={handleFileUpload} 
                         multiple 
                         className="hidden" 
                       />
                     </div>
                     
                     {activeItem.attachments.length === 0 ? (
                       <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-6 text-center">
                         <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                         <p className="text-sm font-light text-slate-500">No hay archivos adjuntos.</p>
                       </div>
                     ) : (
                       <div className="grid gap-2">
                         {activeItem.attachments.map(att => (
                           <div key={att.id} className="flex flex-row items-center justify-between p-3 border border-slate-100 rounded-lg bg-white hover:border-slate-200 transition-colors group">
                             <div className="flex items-center gap-3 overflow-hidden">
                               <div className="p-2 bg-slate-100 rounded text-slate-500 shrink-0">
                                 <File className="w-4 h-4" />
                               </div>
                               <div className="truncate">
                                 <div className="text-sm font-medium text-slate-700 truncate">{att.name}</div>
                                 <div className="text-xs text-slate-400">{formatSize(att.size)}</div>
                               </div>
                             </div>
                             <button 
                               onClick={() => removeAttachment(att.id)}
                               className="p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                 </div>

                 {/* Sidebar Actions */}
                 <div className="w-full md:w-48 space-y-6 shrink-0">
                   <div className="space-y-2">
                     <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Estado de Iniciativa</h4>
                     
                     {(["Pendiente", "En Progreso", "Completado"] as Status[]).map((status) => {
                       const isActive = activeItem.status === status;
                       const icons = {
                         "Pendiente": <Clock className={`w-4 h-4 ${isActive ? 'text-slate-700' : 'text-slate-400'}`} />,
                         "En Progreso": <LayoutList className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />,
                         "Completado": <CheckCircle className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                       };
                       return (
                         <button
                           key={status}
                           onClick={() => updateActiveItem({ status })}
                           className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                             ${isActive 
                               ? status === 'Completado' ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300' :
                                 status === 'En Progreso' ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-300' :
                                 'bg-slate-200 text-slate-800 ring-1 ring-slate-300'
                               : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                             }
                           `}
                         >
                           {icons[status]}
                           {status}
                         </button>
                       )
                     })}
                   </div>
                 </div>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </ScreenContainer>
  );
}
