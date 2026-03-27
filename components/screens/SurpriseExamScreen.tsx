"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"

export function SurpriseExamScreen({
  onBack
}: {
  onBack: () => void
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>("Aceleración")
  const answers = ["Velocidad lineal", "Aceleración", "Fuerza angular", "Posición absoluta"]

  return (
    <div className="h-full px-5 py-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-foreground text-lg font-semibold">Examen sorpresa</h1>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">10 preguntas</span>
        </div>
        <button onClick={onBack} className="text-destructive text-sm font-medium">Abandonar</button>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-card rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: "30%" }} />
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4">Pregunta 3 · Física</p>

      <div className="bg-card rounded-xl p-5 mb-6">
        <p className="text-foreground text-lg leading-relaxed">¿Qué magnitud mide el acelerómetro de un robot?</p>
      </div>

      <div className="flex-1 space-y-3">
        {answers.map((answer) => {
          const isSelected = selectedAnswer === answer
          return (
            <button
              key={answer}
              onClick={() => setSelectedAnswer(answer)}
              className={`w-full bg-card rounded-xl p-4 text-left transition-all flex items-center gap-4 ${
                isSelected ? "border-2 border-primary" : "border-2 border-transparent hover:border-border"
              } active:scale-[0.98]`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
              </div>
              <span className={`text-base ${isSelected ? "text-primary" : "text-foreground"}`}>{answer}</span>
            </button>
          )
        })}
      </div>

      <button
        className={`w-full font-medium py-3.5 rounded-[10px] transition-all ${
          selectedAnswer ? "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98]" : "bg-card text-muted-foreground cursor-not-allowed"
        }`}
        disabled={!selectedAnswer}
      >
        Siguiente pregunta
      </button>
    </div>
  )
}
