"use client"

import { ChevronLeft } from "lucide-react"

export function StudyScreen({
  onBack,
  onNext
}: {
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="h-full px-5 py-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="text-foreground" size={24} />
          </button>
          <h1 className="text-foreground text-lg font-semibold">Límites</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        </div>
      </div>

      <div className="flex-1 bg-card rounded-xl p-5 mb-4 overflow-y-auto">
        <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-3">
          Concepto
        </span>

        <p className="text-foreground leading-relaxed mb-4">
          Un <span className="text-accent font-medium">límite</span> describe el valor al que se aproxima 
          una función cuando su variable independiente se acerca a un punto específico. Es la base del 
          cálculo diferencial e integral.
        </p>

        <p className="text-foreground leading-relaxed mb-6">
          Matemáticamente, escribimos: <span className="font-mono text-accent">lim x→a f(x) = L</span>
        </p>

        <div className="border-2 border-dashed border-border rounded-xl p-8 flex items-center justify-center mb-4">
          <div className="text-center">
            <div className="text-muted-foreground text-4xl mb-2">📈</div>
            <p className="text-muted-foreground text-sm">Gráfico interactivo</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full">
          <span className="text-xs">🤖</span>
          <span className="text-xs font-medium">Aplicación en robótica</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Siguiente
        </button>
        <button className="w-full border border-border text-foreground font-medium py-3.5 rounded-[10px] transition-all hover:bg-card active:scale-[0.98]">
          Explicame de otra forma
        </button>
      </div>
    </div>
  )
}
