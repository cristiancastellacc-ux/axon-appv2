"use client"

import { X } from "lucide-react"
import { ScreenHelpers } from "./ScreenHelpers"

export function MenuScreen({
  onClose,
  onSelectSubject
}: {
  onClose: () => void
  onSelectSubject: () => void
}) {
  const subjects = [
    { name: "Matemática", color: "#00D4C8", progress: 55, active: true },
    { name: "Física", color: "#2B7FFF", progress: 30, active: false },
    { name: "Electrónica", color: "#4A6A8A", progress: 10, active: false },
    { name: "Programación", color: "#4A6A8A", progress: 0, active: false }
  ]

  return (
    <div className="h-full bg-background px-5 py-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-primary font-bold text-xl tracking-[0.3em]">AXON</h1>
        <button onClick={onClose} className="p-1">
          <X className="text-muted-foreground" size={24} />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
          JD
        </div>
        <div>
          <p className="text-foreground font-medium">Juan Díaz</p>
          <p className="text-muted-foreground text-sm">Estudiante</p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4">
        Tecnicatura en Robótica
      </p>

      <div className="space-y-3">
        {subjects.map((subject) => (
          <button
            key={subject.name}
            onClick={subject.active ? onSelectSubject : undefined}
            className={`w-full bg-card rounded-xl p-4 text-left transition-all ${
              subject.active ? "hover:brightness-110 active:scale-[0.98]" : "opacity-70"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
              <span className="text-foreground font-medium">{subject.name}</span>
            </div>
            <div className="h-1.5 bg-background rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${subject.progress}%`,
                  backgroundColor: subject.color
                }}
              />
            </div>
            <p className="text-muted-foreground text-xs mt-1">{subject.progress}% completado</p>
          </button>
        ))}
      </div>
    </div>
  )
}
