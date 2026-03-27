"use client"

import { Star, Check } from "lucide-react"

export function TopicCompletedScreen({
  onNextTopic,
  onReview
}: {
  onNextTopic: () => void
  onReview: () => void
}) {
  const summaryPoints = [
    "Los límites al infinito describen el comportamiento extremo",
    "Si el denominador crece, el límite tiende a 0",
    "Aplicación: control de velocidad en robótica"
  ]

  return (
    <div className="h-full px-5 py-4 flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-5 bg-accent/20 text-accent px-3 py-1.5 rounded-full">
        <span className="text-sm font-medium">+15 XP</span>
      </div>

      <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
        <Check className="text-accent-foreground" size={40} />
      </div>

      <h1 className="text-foreground text-2xl font-bold mb-2 text-center">Límites al infinito completado!</h1>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-muted-foreground text-sm">Nivel de dominio:</span>
        <span className="text-accent font-medium ml-1">Alto</span>
      </div>
      <div className="flex items-center gap-1 mb-6">
        <Star className="text-accent fill-accent" size={20} />
        <Star className="text-accent fill-accent" size={20} />
        <Star className="text-accent fill-accent" size={20} />
      </div>

      <div className="w-full bg-card rounded-xl p-5 mb-6">
        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Resumen</p>
        <ul className="space-y-2">
          {summaryPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span className="text-foreground text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={onNextTopic}
          className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Siguiente tema
        </button>
        <button
          onClick={onReview}
          className="w-full border border-border text-foreground font-medium py-3.5 rounded-[10px] transition-all hover:bg-card active:scale-[0.98]"
        >
          Repasar este tema
        </button>
      </div>
    </div>
  )
}
