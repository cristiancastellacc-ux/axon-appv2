"use client"

import { useState } from "react"
import { ChevronLeft, X, Check } from "lucide-react"

export function MiniTestScreen({
  onClose,
  onComplete
}: {
  onClose: () => void
  onComplete: () => void
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const answers = ["0", "5", "∞"]

  return (
    <div className="h-full px-5 py-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-foreground text-lg font-semibold">Mini test · Límites al infinito</h1>
        <button onClick={onClose} className="p-1">
          <X className="text-muted-foreground" size={24} />
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-muted-foreground text-sm">Pregunta 2 de 3</span>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-6 h-2.5 rounded-full bg-primary" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        </div>
      </div>

      <div className="bg-card rounded-xl p-5 mb-6">
        <p className="text-foreground text-lg leading-relaxed">
          Si <span className="font-mono text-accent">f(x) = 5/x²</span>, ¿cuál es el límite cuando{' '}
          <span className="font-mono text-accent">x → ∞</span>?
        </p>
      </div>

      <div className="flex-1 space-y-3">
        {answers.map((answer) => {
          const isSelected = selectedAnswer === answer
          return (
            <button
              key={answer}
              onClick={() => setSelectedAnswer(answer)}
              className={`w-full bg-card rounded-xl p-4 text-left transition-all flex items-center gap-4 ${
                isSelected
                  ? "border-2 border-primary"
                  : "border-2 border-transparent hover:border-border"
              } active:scale-[0.98]`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                }`}
              >
                {isSelected && <Check className="text-primary-foreground" size={12} />}
              </div>
              <span className={`text-lg font-mono ${isSelected ? "text-primary" : "text-foreground"}`}>
                {answer}
              </span>
            </button>
          )
        })}
      </div>

      <p className="text-muted-foreground text-xs text-center mb-4">Podés cambiar tu respuesta antes de confirmar.</p>

      <button
        onClick={onComplete}
        className={`w-full font-medium py-3.5 rounded-[10px] transition-all ${
          selectedAnswer
            ? "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98]"
            : "bg-card text-muted-foreground cursor-not-allowed"
        }`}
        disabled={!selectedAnswer}
      >
        Confirmar respuesta
      </button>
    </div>
  )
}
