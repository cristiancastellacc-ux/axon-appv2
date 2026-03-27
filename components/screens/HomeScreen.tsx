"use client"

import { Clock, Zap, RefreshCw, Menu, ChevronRight, Check } from "lucide-react"
import { ScreenHelpers } from "./ScreenHelpers"

const {  } = ScreenHelpers

export function HomeScreen({
  onOpenMenu,
  onContinueStudy,
  onQuickSession,
  onSurpriseExam
}: {
  onOpenMenu: () => void
  onContinueStudy: () => void
  onQuickSession: () => void
  onSurpriseExam: () => void
}) {
  return (
    <div className="h-full px-5 py-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onOpenMenu} className="p-1">
          <Menu className="text-primary" size={24} />
        </button>
        <h1 className="text-primary font-bold text-xl tracking-[0.3em]">AXON</h1>
        <div className="flex items-center gap-1 text-accent">
          <span>🔥</span>
          <span className="text-sm font-medium">5 días</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-1.5 bg-card rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: "42%" }} />
        </div>
        <p className="text-muted-foreground text-xs mt-1">42% completado</p>
      </div>

      <div className="bg-card rounded-xl p-5 mb-4">
        <p className="text-muted-foreground text-xs mb-1">Continuar</p>
        <h2 className="text-foreground text-2xl font-semibold mb-3">Funciones</h2>
        <div className="mb-4">
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
          </div>
          <p className="text-muted-foreground text-xs mt-1">60% completado</p>
        </div>

        <button
          onClick={onContinueStudy}
          className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Seguir estudiando
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={onQuickSession}
          className="flex-1 border border-primary text-primary text-sm font-medium py-3 rounded-[10px] transition-all hover:bg-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Clock size={16} />
          Sesion rapida
        </button>
        <button
          onClick={onSurpriseExam}
          className="flex-1 border border-primary text-primary text-sm font-medium py-3 rounded-[10px] transition-all hover:bg-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Zap size={16} />
          Examen
        </button>
        <button
          className="flex-1 border border-primary text-primary text-sm font-medium py-3 rounded-[10px] transition-all hover:bg-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} />
          Repasar
        </button>
      </div>

      <div className="bg-card rounded-xl rounded-l-none border-l-4 border-l-accent p-4 mb-4">
        <p className="text-accent text-xs font-medium mb-1">Axon recomienda</p>
        <p className="text-foreground text-sm mb-1">
          Te conviene repasar <span className="text-accent font-medium">Derivadas</span> antes del examen
        </p>
        <p className="text-muted-foreground text-xs">Hace 4 dias que no la ves</p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 bg-card rounded-xl p-4 text-center">
          <p className="text-[#F1C40F] text-2xl font-bold">42</p>
          <p className="text-muted-foreground text-xs">dias de racha</p>
        </div>
        <div className="flex-1 bg-card rounded-xl p-4 text-center">
          <p className="text-primary text-2xl font-bold">18</p>
          <p className="text-muted-foreground text-xs">temas vistos</p>
        </div>
      </div>
    </div>
  )
}
