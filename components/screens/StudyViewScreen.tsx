"use client"

import { ChevronLeft } from "lucide-react"

export function StudyViewScreen({
  onBack,
  onNext,
  onOpenTutor
}: {
  onBack: () => void
  onNext: () => void
  onOpenTutor: () => void
}) {
  return (
    <div className="h-full px-5 py-4 flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="text-foreground" size={24} />
          </button>
          <h1 className="text-foreground text-lg font-semibold">Límites al infinito</h1>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        </div>
      </div>

      <button
        onClick={onOpenTutor}
        className="absolute top-4 right-5 bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full hover:brightness-110 active:scale-[0.98] transition-all z-10"
      >
        Tutor IA
      </button>

      <div className="flex-1 bg-card rounded-xl p-5 mb-4 overflow-y-auto">
        <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-3">Concepto</span>
        <p className="text-foreground leading-relaxed mb-4">
          Un <span className="text-accent font-medium">límite al infinito</span> describe el comportamiento de f(x) cuando x crece sin límite. Si f(x) = 1/x, el límite cuando x→∞ es 0.
        </p>

        <div className="border-2 border-dashed border-border rounded-xl p-6 flex items-center justify-center mb-4 bg-background/50">
          <p className="text-muted-foreground text-sm">gráfico de f(x)=1/x</p>
        </div>

        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full mb-6">
          <span className="text-xs font-medium">Aplicación en robótica</span>
        </div>

        <span className="inline-block text-primary text-xs font-semibold uppercase tracking-wider mb-3">Ejemplo</span>
        <p className="text-foreground leading-relaxed">
          Si un robot se aleja indefinidamente, su velocidad angular tiende a 0.
        </p>
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
