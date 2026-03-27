"use client"

import { useState } from "react"
import { ChevronLeft, Clock, Camera, X } from "lucide-react"

export function ExerciseScreen({
  onBack,
  onNext,
  onOpenTutor
}: {
  onBack: () => void
  onNext: () => void
  onOpenTutor: () => void
}) {
  const [selfEval, setSelfEval] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)

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
          <div className="w-2 h-2 rounded-full bg-accent" />
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

      <div className="bg-card rounded-xl p-5 mb-4">
        <span className="inline-flex items-center gap-2 text-[#FF8C42] text-xs font-semibold uppercase tracking-wider mb-3">Ejercicio</span>
        <p className="text-foreground text-lg font-semibold leading-relaxed mb-3">
          Calcula el limite cuando x → ∞ de la funcion <span className="font-mono text-accent">f(x) = 3x / (x + 5)</span>
        </p>
        <p className="text-muted-foreground text-sm">Resolvelo en tu hoja. Desarrolla todos los pasos.</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 bg-[#0D1E30] text-muted-foreground px-3 py-1.5 rounded-full text-xs">
          <Clock size={14} />
          <span className="font-mono">00:00</span>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          Ver pista
        </button>
      </div>

      {showHint && (
        <div className="bg-[#0D1E30] border border-border rounded-xl p-4 mb-4">
          <p className="text-muted-foreground text-sm">Divide numerador y denominador por la mayor potencia de x.</p>
        </div>
      )}

      <div className="flex-1 border-2 border-dashed border-border rounded-xl flex items-center justify-center mb-4">
        <p className="text-muted-foreground text-sm">Espacio de trabajo</p>
      </div>

      <div className="mb-4">
        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Como te fue?</p>

        <div className="space-y-2">
          <button
            onClick={() => setSelfEval("good")}
            className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all ${
              selfEval === "good" ? "bg-[#2ECC71]/20 border-2 border-[#2ECC71]" : "bg-card border-2 border-transparent hover:border-border"
            }`}
          >
            <Check className={selfEval === "good" ? "text-[#2ECC71]" : "text-muted-foreground"} size={20} />
            <span className={selfEval === "good" ? "text-[#2ECC71]" : "text-foreground"}>Entendi completamente</span>
          </button>

          <button
            onClick={() => setSelfEval("doubt")}
            className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all ${
              selfEval === "doubt" ? "bg-[#FF8C42]/20 border-2 border-[#FF8C42]" : "bg-card border-2 border-transparent hover:border-border"
            }`}
          >
            <span className={`text-lg ${selfEval === "doubt" ? "text-[#FF8C42]" : "text-muted-foreground"}`}>~</span>
            <span className={selfEval === "doubt" ? "text-[#FF8C42]" : "text-foreground"}>Tuve alguna duda</span>
          </button>

          <button
            onClick={() => setSelfEval("bad")}
            className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all ${
              selfEval === "bad" ? "bg-destructive/20 border-2 border-destructive" : "bg-card border-2 border-transparent hover:border-border"
            }`}
          >
            <X className={selfEval === "bad" ? "text-destructive" : "text-muted-foreground"} size={20} />
            <span className={selfEval === "bad" ? "text-destructive" : "text-foreground"}>No pude resolverlo</span>
          </button>
        </div>
      </div>

      <button
        onClick={onNext}
        className={`w-full font-medium py-3.5 rounded-[10px] transition-all ${
          selfEval ? "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98]" : "bg-card text-muted-foreground cursor-not-allowed"
        }`}
        disabled={!selfEval}
      >
        Siguiente
      </button>
    </div>
  )
}
