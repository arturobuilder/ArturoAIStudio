import { motion } from "motion/react";
import { ReactNode } from "react";

export function ScreenContainer({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-primary mb-2">{title}</h1>
        {subtitle && <h2 className="text-xl text-text-muted font-light">{subtitle}</h2>}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
}

export function Card({ children, className = "", ...props }: { children: ReactNode; className?: string; [x: string]: any }) {
  return (
    <div className={`bg-card rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
}
