import * as React from "react";
import { useState, useRef } from "react";
import { ScreenContainer, Card } from "../components/ui-elements";
import { 
  LineChart, LayoutDashboard, Route, Handshake, UsersRound, 
  CheckCircle, Target, AlignLeft, Paperclip, X, Clock, LayoutList, Upload, File, Trash2,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDeliverables, Deliverable, Attachment, Status } from "../context/DeliverablesContext";

export function Phase3Screen() {
  const { getDeliverablesByPhase, updateDeliverable } = useDeliverables();
  const deliverables = getDeliverablesByPhase("phase3");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeItem = deliverables.find(d => d.id === selectedId);

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
    <ScreenContainer title="Fase 3 – Control (1 semana)" subtitle="Control">
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-medium text-text-main mb-6">Actividades Principales</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-emerald-100 p-2.5 rounded-xl h-10 w-10 flex items-center justify-center shrink-0">
                <LineChart className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Definición de KPIs y Alertas</h4>
                <p className="text-sm font-light text-text-muted mt-1">Establecer indicadores clave de rendimiento y umbrales de alerta.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-indigo-100 p-2.5 rounded-xl h-10 w-10 flex items-center justify-center shrink-0">
                <LayoutDashboard className="w-5 h-5 text-indigo-700" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Diseño de Dashboards</h4>
                <p className="text-sm font-light text-slate-500 mt-1">Visualización de la salud de la operación en tiempo real.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-sky-100 p-2.5 rounded-xl h-10 w-10 flex items-center justify-center shrink-0">
                <Route className="w-5 h-5 text-sky-700" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Roadmap</h4>
                <p className="text-sm font-light text-slate-500 mt-1">Plan de trabajo para iniciativas a mediano/largo plazo.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-amber-100 p-2.5 rounded-xl h-10 w-10 flex items-center justify-center shrink-0">
                <Handshake className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Handover</h4>
                <p className="text-sm font-light text-slate-500 mt-1">Transferencia de conocimiento y responsabilidades al equipo interno.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Hito Central */}
          <Card className="bg-slate-800 text-white border-none shadow-lg">
            <h4 className="text-sm text-slate-400 dark:text-slate-500 font-semibold mb-1 uppercase tracking-wider">Hito Final</h4>
            <h3 className="text-xl font-medium mb-2">Presentación Ejecutiva Final</h3>
            <p className="text-slate-300 font-light text-sm">Cierre formal del proyecto mostrando los resultados obtenidos, el nuevo modelo operativo y el roadmap a futuro.</p>
          </Card>

          {/* Kanban / Cards de Entregables */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Entregables 
              <span className="text-xs font-light text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full ml-auto">Click para editar</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {deliverables.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedId(item.id)}
                  className={`bg-card border rounded-xl p-4 flex flex-col cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md
                    ${selectedId === item.id ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-slate-200 dark:border-slate-800'}
                  `}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className={`p-2 rounded-lg ${item.color.bg} ${item.color.text}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full
                      ${item.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' : 
                        item.status === 'En Progreso' ? 'bg-blue-100 text-blue-700' : 
                        'bg-slate-100 text-slate-500'}
                    `}>
                      {item.status}
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">{item.title}</h4>
                  
                  <div className="flex justify-start gap-3 mt-auto text-slate-400 pt-2">
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
        </div>
      </div>

      {/* Trello-like Modal */}
      <AnimatePresence>
        {selectedId && activeItem && (
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
               <div className={`flex p-6 border-b border-slate-100 justify-between items-start ${activeItem.color.tint}`}>
                 <div className="flex items-center gap-4 w-full">
                   <div className={`p-3 rounded-xl bg-white shadow-sm ${activeItem.color.text} shrink-0`}>
                     <activeItem.icon className="w-6 h-6" />
                   </div>
                   <div className="flex-1 w-full min-w-0 pr-4">
                     <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1 px-1">Entregable Fase 3</p>
                     <input 
                       value={activeItem.title}
                       onChange={(e) => updateActiveItem({ title: e.target.value })}
                       className="text-2xl font-bold text-slate-800 bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-primary focus:outline-none transition-colors w-full px-1 -ml-1 text-ellipsis"
                     />
                   </div>
                 </div>
                 <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-500 bg-white shadow-sm border border-slate-200 shrink-0">
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
                       placeholder="Agrega una descripción detallada..."
                       className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y text-sm text-text-muted bg-surface focus:bg-white custom-scrollbar leading-relaxed"
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
                       <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center">
                         <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                         <p className="text-sm font-light text-slate-500">No hay archivos adjuntos.</p>
                       </div>
                     ) : (
                       <div className="grid gap-2">
                         {activeItem.attachments.map(att => (
                           <div key={att.id} className="flex flex-row items-center justify-between p-3 border border-slate-100 rounded-lg bg-white hover:border-slate-200 transition-colors group shadow-sm hover:shadow">
                             <div className="flex items-center gap-3 overflow-hidden">
                               <div className="p-2.5 bg-slate-100 rounded-lg text-slate-500 shrink-0">
                                 <File className="w-4 h-4" />
                               </div>
                               <div className="truncate">
                                 <div className="text-sm font-medium text-slate-700 truncate">{att.name}</div>
                                 <div className="text-xs text-slate-400 mt-0.5">{formatSize(att.size)}</div>
                               </div>
                             </div>
                             <button 
                               onClick={() => removeAttachment(att.id)}
                               className="p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100 mx-1"
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
                     <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Estado del Entregable</h4>
                     
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
                           className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                             ${isActive 
                               ? status === 'Completado' ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300 shadow-sm' :
                                 status === 'En Progreso' ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-300 shadow-sm' :
                                 'bg-slate-200 text-slate-800 ring-1 ring-slate-300 shadow-sm'
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
