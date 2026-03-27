"use client"

import { useState } from "react"
import { BookOpen, TrendingUp, Clock, Calendar, FileText, Settings, Lock, ChevronRight, LogOut, ChevronLeft, } from "lucide-react"
import { ToggleRow } from "./ScreenHelpers"

export function ProfileScreen({
  onBack,
  onOpenNotes,
  onOpenTutor
}: {
  onBack: () => void
  onOpenNotes: () => void
  onOpenTutor: () => void
}) {
  const [aiMode, setAiMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  const careerInfo = [
    { icon: BookOpen, label: "Materias activas", value: "4" },
    { icon: TrendingUp, label: "Progreso general", value: "42%" },
    { icon: Clock, label: "Tiempo total", value: "38 hs" },
    { icon: Calendar, label: "Miembro desde", value: "Marzo 2025" }
  ]

  return (
    <div className="h-full px-5 py-4 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Perfil</h1>
      </div>

      <div className="bg-card rounded-xl p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">JR</div>
          <div>
            <h2 className="text-foreground text-lg font-semibold">Juan Rodríguez</h2>
            <p className="text-muted-foreground text-sm">Tecnicatura en Robótica — Año 2</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1.5 rounded-full">
          <span className="text-sm font-medium">42 días de racha</span>
          <span>🔥</span>
        </div>
      </div>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Mi carrera</p>
      <div className="bg-card rounded-xl mb-6 divide-y divide-border">
        {careerInfo.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-muted-foreground" />
                <span className="text-foreground">{item.label}</span>
              </div>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
          )
        })}
      </div>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Modo de estudio</p>
      <div className="bg-card rounded-xl mb-6 divide-y divide-border">
        <ToggleRow label="Modo IA" enabled={aiMode} onToggle={() => setAiMode(!aiMode)} />
        <ToggleRow label="Notificaciones" enabled={notifications} onToggle={() => setNotifications(!notifications)} />
        <ToggleRow label="Modo oscuro" enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      </div>

      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Cuenta</p>
      <div className="bg-card rounded-xl divide-y divide-border mb-4">
        <button onClick={onOpenNotes} className="w-full p-4 text-left text-foreground hover:bg-background/50 transition-colors flex items-center gap-3">
          <FileText size={18} className="text-muted-foreground" />
          <span className="flex-1">Notas y formulas</span>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
        <button className="w-full p-4 text-left text-foreground hover:bg-background/50 transition-colors flex items-center gap-3">
          <Settings size={18} className="text-muted-foreground" />
          <span className="flex-1">Configuracion</span>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
        <button className="w-full p-4 text-left text-foreground hover:bg-background/50 transition-colors flex items-center gap-3">
          <Lock size={18} className="text-muted-foreground" />
          <span className="flex-1">Cambiar contrasena</span>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
        <button className="w-full p-4 text-left text-foreground hover:bg-background/50 transition-colors flex items-center gap-3">
          <FileText size={18} className="text-muted-foreground" />
          <span className="flex-1">Exportar mis notas</span>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      </div>

      <button className="w-full p-4 text-center text-destructive hover:bg-destructive/10 rounded-xl transition-colors flex items-center justify-center gap-2">
        <LogOut size={18} />
        Cerrar sesion
      </button>
    </div>
  )
}
