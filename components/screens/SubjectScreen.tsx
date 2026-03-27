"use client"

import { ChevronLeft } from "lucide-react"
import { TopicCard } from "./ScreenHelpers"

export function SubjectScreen({
  onBack,
  onSelectTopic
}: {
  onBack: () => void
  onSelectTopic: () => void
}) {
  const topics = [
    { name: "Funciones", status: "completed", badge: "Alto" },
    { name: "Límites", status: "active", progress: 60 },
    { name: "Derivadas", status: "locked" },
    { name: "Integrales", status: "locked" }
  ]

  return (
    <div className="h-full px-5 py-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Matemática</h1>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => (
          <TopicCard
            key={topic.name}
            topic={topic}
            onClick={topic.status === "active" ? onSelectTopic : undefined}
          />
        ))}
      </div>
    </div>
  )
}
