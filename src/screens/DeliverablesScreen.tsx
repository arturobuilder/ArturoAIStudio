import { useState, useRef } from "react";
import * as React from "react";
import { ScreenContainer } from "../components/ui-elements";
import { useDeliverables, Deliverable, Attachment, Status } from "../context/DeliverablesContext";
import { Target, AlignLeft, Paperclip, CheckCircle, Clock, LayoutList, Upload, File, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function DeliverablesScreen() {
  const { deliverables, updateDeliverable } = useDeliverables();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeItem = deliverables.find(d => d.id === selectedId);

  const updateActiveItem = (updates: Partial<Deliverable>) => {
    if (!selectedId) return;
    updateDeliverable(selectedId, updates);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !activeItem) return;

    const newAttachments: Attachment[] = Array.from(files).map((file: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size
    }));

    updateActiveItem({ attachments: [...activeItem.attachments, ...newAttachments] });
  };

  const removeAttachment = (attachmentId: string) => {
    if (!activeItem) return;
    updateActiveItem({ attachments: activeItem.attachments.filter(a => a.id !== attachmentId) });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Group by Phase
  const phases = [
    { id: "phase1", name: "Fase 1: Diseño", items: deliverables.filter(d => d.phaseId === 'phase1') },
    { id: "phase2", name: "Fase 2: Ejecución", items: deliverables.filter(d => d.phaseId === 'phase2') },
    { id: "phase3", name: "Fase 3: Control", items: deliverables.filter(d => d.phaseId === 'phase3') },
  ];

  return (
    <ScreenContainer title="Entregables Globales" subtitle="Vista consolidada del ciclo de vida documental">
      <div className="mt-8 space-y-12">
        {phases.map(phase => (
          <div key={phase.id} className="space-y-4">
            <h3 className="text-lg font-medium text-text-main dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 dark:border-slate-800 pb-2">
              {phase.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {phase.items.map(item => {
                const IconComponent = item.icon || Target;
                return (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedId(item.id)}
                    className={`bg-card border rounded-xl p-4 flex flex-col cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md
                      ${selectedId === item.id ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-slate-200 dark:border-slate-800'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2 rounded-lg ${item.color?.bg || 'bg-slate-100 dark:bg-slate-800'} ${item.color?.text || 'text-slate-700'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full
                        ${item.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' : 
                          item.status === 'En Progreso' ? 'bg-blue-100 text-blue-700' : 
                          'bg-slate-100 text-text-muted'}
                      `}>
                        {item.status}
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-text-main mb-1">{item.title}</h4>
                    
                    <div className="flex justify-start gap-3 mt-auto text-text-muted pt-2">
                      {item.description && <AlignLeft className="w-3.5 h-3.5" />}
                      {item.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>{item.attachments.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && activeItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-card w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${activeItem.color?.tint || 'bg-slate-100'} ${activeItem.color?.text || 'text-slate-700'}`}>
                    {React.createElement(activeItem.icon || Target, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={activeItem.title}
                      onChange={(e) => updateActiveItem({ title: e.target.value })}
                      className="text-xl sm:text-2xl font-bold bg-transparent border-none p-0 focus:ring-0 text-text-main w-full"
                      placeholder="Título del entregable..."
                    />
                    <div className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">
                      ID: {activeItem.id}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedId(null)}
                  className="p-2 text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row overflow-y-auto custom-scrollbar">
                <div className="p-4 sm:p-6 flex-1 space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-text-main">
                      <AlignLeft className="w-4 h-4 text-text-muted" /> Descripción
                    </h3>
                    <textarea
                      value={activeItem.description}
                      onChange={(e) => updateActiveItem({ description: e.target.value })}
                      placeholder="Añade una descripción detallada o requisitos para este entregable..."
                      className="w-full min-h-[120px] p-4 text-sm bg-surface/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y text-text-main"
                    />
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <h3 className="text-sm font-semibold flex items-center gap-2 text-text-main">
                        <Paperclip className="w-4 h-4 text-text-muted" /> Archivos Adjuntos ({activeItem.attachments.length})
                      </h3>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" /> Añadir archivo
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
                      <div className="bg-surface border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center">
                        <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                        <p className="text-sm font-light text-slate-500">No hay archivos adjuntos.</p>
                      </div>
                    ) : (
                      <div className="grid gap-2">
                        {activeItem.attachments.map(att => (
                          <div key={att.id} className="flex flex-row items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg bg-card hover:border-slate-200 dark:hover:border-slate-700 transition-colors group shadow-sm hover:shadow">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="p-2.5 bg-surface rounded-lg text-slate-500 shrink-0">
                                <File className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <div className="text-sm font-medium text-text-main truncate">{att.name}</div>
                                <div className="text-xs text-text-muted mt-0.5">{formatSize(att.size)}</div>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeAttachment(att.id)}
                              className="p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 rounded transition-colors opacity-0 group-hover:opacity-100 mx-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-48 space-y-6 shrink-0 p-4 sm:p-6 md:border-l border-slate-100 dark:border-slate-800 bg-surface/30">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Estado del Entregable</h4>
                    
                    {(["Pendiente", "En Progreso", "Completado"] as Status[]).map((status) => {
                      const isActive = activeItem.status === status;
                      const icons = {
                        "Pendiente": <Clock className={`w-4 h-4 ${isActive ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`} />,
                        "En Progreso": <LayoutList className={`w-4 h-4 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400'}`} />,
                        "Completado": <CheckCircle className={`w-4 h-4 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`} />
                      };
                      return (
                        <button
                          key={status}
                          onClick={() => updateActiveItem({ status })}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                            ${isActive 
                              ? status === 'Completado' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 ring-1 ring-emerald-300 shadow-sm' :
                                status === 'En Progreso' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 ring-1 ring-blue-300 shadow-sm' :
                                'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 ring-1 ring-slate-300 shadow-sm'
                              : 'bg-surface text-text-muted dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
