"use client"

import { ChevronLeft, ChevronRight, Lock, Check } from "lucide-react"

export function SubtopicListScreen({
  onBack,
  onSelectSubtopic
}: {
  onBack: () => void
  onSelectSubtopic: () => void
}) {
  const subtopics = [
    { name: "Concepto de límite", status: "completed" },
    { name: "Límites laterales", status: "completed" },
    { name: "Límites al infinito", status: "inProgress" },
    { name: "Límites indeterminados", status: "locked" }
  ]

  return (
    <div className="h-full px-5 py-4 flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Límites</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-6 ml-9">4 subtemas · 2 completados</p>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {subtopics.map((subtopic) => {
          const isCompleted = subtopic.status === "completed"
          const isInProgress = subtopic.status === "inProgress"
          const isLocked = subtopic.status === "locked"

          return (
            <button
              key={subtopic.name}
              onClick={isInProgress ? onSelectSubtopic : undefined}
              disabled={isLocked}
              className={`w-full bg-card rounded-xl p-4 text-left transition-all flex items-center justify-between ${
                isInProgress ? "border-2 border-primary" : "border-2 border-transparent"
              } ${isLocked ? "opacity-50" : "hover:brightness-110 active:scale-[0.98]"}`}
            >
              <div className="flex items-center gap-3">
                {isCompleted && (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="text-accent-foreground" size={14} />
                  </div>
                )}
                {isInProgress && <ChevronRight className="text-primary" size={20} />}
                {isLocked && <Lock className="text-muted-foreground" size={18} />}
                <span className={`font-medium ${isLocked ? "text-muted-foreground" : "text-foreground"}`}>
                  {subtopic.name}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                isCompleted ? "bg-accent/20 text-accent" : isInProgress ? "bg-primary/20 text-primary" : "bg-muted-foreground/20 text-muted-foreground"
              }`}>
                {isCompleted ? "Completado" : isInProgress ? "En progreso" : "Bloqueado"}
              </span>
            </button>
          )
        })}
      </div>

      <button
        onClick={onSelectSubtopic}
        className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98] mt-4"
      >
        Continuar: Límites al infinito
      </button>
    </div>
  )
}
