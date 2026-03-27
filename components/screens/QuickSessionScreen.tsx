"use client"

import { Play, ChevronLeft } from "lucide-react"

export function QuickSessionScreen({
  onBack,
  selectedTime,
  onSelectTime,
  onStart
}: {
  onBack: () => void
  selectedTime: number
  onSelectTime: (time: number) => void
  onStart: () => void
}) {
  const times = [15, 20, 30]

  return (
    <div className="h-full px-5 py-4 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Sesión rápida</h1>
      </div>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Duración</p>
      <div className="flex gap-3 mb-6">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`flex-1 py-3 rounded-full font-medium text-sm transition-all ${
              selectedTime === time ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:brightness-110"
            } active:scale-[0.98]`}
          >
            {time} min
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl p-5 mb-4">
        <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-2">Axon recomienda</span>
        <h2 className="text-foreground text-lg font-semibold mb-1">Límites al infinito</h2>
        <p className="text-muted-foreground text-sm mb-3">Matemática</p>
        <p className="text-muted-foreground text-xs">No lo repasaste en 3 días.</p>
      </div>

      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <div className="w-5 h-5 rounded border-2 border-muted-foreground" />
        <span className="text-foreground text-sm">Quiero elegir otro tema</span>
      </label>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="70" fill="none" stroke="#0F2235" strokeWidth="8" />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#2B7FFF"
              strokeWidth="8"
              strokeDasharray={440}
              strokeDashoffset={0}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-foreground text-3xl font-bold">{selectedTime}:00</span>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Play size={20} />
        Empezar sesión
      </button>
    </div>
  )
}
