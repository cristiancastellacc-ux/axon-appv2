"use client"

export function ProgressScreen({ onBack }: { onBack: () => void }) {
  const stats = [
    { value: "42", label: "dias de racha", color: "#00D4C8", border: true },
    { value: "18", label: "temas completados", color: "#2B7FFF", border: false },
    { value: "38 hs", label: "tiempo total", color: "#FF8C42", border: false },
    { value: "73%", label: "promedio examenes", color: "#2ECC71", border: false }
  ]

  const subjects = [
    { name: "Matematica", progress: 68, color: "#2B7FFF" },
    { name: "Fisica", progress: 35, color: "#2B7FFF" },
    { name: "Electronica", progress: 12, color: "#4A6A8A" },
    { name: "Programacion", progress: 0, color: "#4A6A8A", label: "No iniciada" }
  ]

  const weakPoints = [
    { name: "Derivadas", color: "#E74C3C" },
    { name: "Circuitos RC", color: "#E74C3C" },
    { name: "Cinematica", color: "#E74C3C" }
  ]

  const achievementsUnlocked = [
    { emoji: "⭐", label: "7 dias seguidos", color: "#F1C40F" },
    { emoji: "✓", label: "Primer tema", color: "#00D4C8" },
    { emoji: "⚡", label: "10 temas vistos", color: "#FF8C42" },
    { emoji: "📄", label: "Primer PDF", color: "#9B59FF" }
  ]

  const achievementsLocked = [
    { emoji: "🔥", label: "30 dias racha" },
    { emoji: "📚", label: "50 temas" },
    { emoji: "🎓", label: "Materia completa" },
    { emoji: "🏆", label: "100 dias" }
  ]

  const errorHistory = [
    { subject: "Matematica", topic: "Derivadas parciales", times: 3 },
    { subject: "Fisica", topic: "Cinematica rotacional", times: 2 },
    { subject: "Electronica", topic: "Circuitos RC", times: 2 }
  ]

  return (
    <div className="h-full px-5 py-4 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-foreground text-xl font-bold">Mi progreso</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl p-4"
            style={stat.border ? { borderColor: stat.color, borderWidth: 2 } : {}}
          >
            <p className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Por materia</p>
      <div className="space-y-2 mb-6">
        {subjects.map((subject) => (
          <div key={subject.name} className="bg-card rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-medium text-sm">{subject.name}</span>
              <span className="text-sm" style={{ color: subject.color }}>
                {subject.label || `${subject.progress}%`}
              </span>
            </div>
            <div className="h-1 bg-[#1B3350] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.max(subject.progress, 2)}%`,
                  backgroundColor: subject.color
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Puntos debiles — IA detecto</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {weakPoints.map((point) => (
          <span
            key={point.name}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
            style={{
              backgroundColor: `${point.color}20`,
              color: point.color,
              border: `1px solid ${point.color}40`
            }}
          >
            {point.name}
          </span>
        ))}
      </div>
      <p className="text-muted-foreground text-xs mb-6">
        Basado en tus ultimos errores. La app recomienda repasar estos primero.
      </p>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Logros</p>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {achievementsUnlocked.map((achievement) => (
          <div key={achievement.label} className="flex flex-col items-center p-2 bg-card rounded-xl">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
              style={{ backgroundColor: `${achievement.color}20` }}
            >
              <span className="text-lg">{achievement.emoji}</span>
            </div>
            <p className="text-[9px] text-center leading-tight text-foreground">{achievement.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {achievementsLocked.map((achievement) => (
          <div key={achievement.label} className="flex flex-col items-center p-2 bg-card/50 rounded-xl opacity-50">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 bg-muted-foreground/20">
              <span>{achievement.emoji}</span>
            </div>
            <p className="text-[9px] text-center leading-tight text-muted-foreground">{achievement.label}</p>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Historial reciente de errores</p>
      <div className="space-y-2">
        {errorHistory.map((error) => (
          <div key={error.topic} className="bg-card rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{error.subject}</span>
              <span className="text-foreground text-sm">{error.topic}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-destructive text-sm">{error.times}x</span>
              <button className="text-accent text-xs hover:brightness-110">Repasar →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
