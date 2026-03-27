"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"

export function TestScreen({
  onBack,
  selectedAnswer,
  onSelectAnswer
}: {
  onBack: () => void
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
}) {
  const answers = ["6", "3", "9"]

  return (
    <div className="h-full px-5 py-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-6 h-2.5 rounded-full bg-primary" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="w-8" />
      </div>

      <div className="bg-card rounded-xl p-5 mb-6">
        <p className="text-foreground text-lg leading-relaxed">
          ¿Cuál es el límite de <span className="font-mono text-accent">f(x) = 2x</span> cuando{' '}
          <span className="font-mono text-accent">x → 3</span>?
        </p>
      </div>

      <div className="flex-1 space-y-3">
        {answers.map((answer) => {
          const isSelected = selectedAnswer === answer
          return (
            <button
              key={answer}
              onClick={() => onSelectAnswer(answer)}
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
                {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
              </div>
              <span className={`text-lg font-mono ${isSelected ? "text-primary" : "text-foreground"}`}>
                {answer}
              </span>
            </button>
          )
        })}
      </div>

      <button
        className={`w-full font-medium py-3.5 rounded-[10px] transition-all ${
          selectedAnswer
            ? "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98]"
            : "bg-card text-muted-foreground cursor-not-allowed"
        }`}
        disabled={!selectedAnswer}
      >
        Responder
      </button>
    </div>
  )
}
