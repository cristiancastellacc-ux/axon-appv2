"use client"

import { Check, ChevronRight, Lock } from "lucide-react"
import React from "react"

export function CircuitPattern() {
  return (
    <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#2B7FFF" />
          <circle cx="22" cy="22" r="1" fill="#00D4C8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  )
}

export function ScreenContainer({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-300 ease-out ${
        isActive
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      {children}
    </div>
  )
}

export function NavButton({
  icon,
  label,
  isActive,
  onClick,
  activeColor = "#2B7FFF"
}: {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
  activeColor?: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 transition-colors"
      style={{ color: isActive ? activeColor : "#4A6A8A" }}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  )
}

export function TopicCard({
  topic,
  onClick
}: {
  topic: { name: string; status: string; badge?: string; progress?: number }
  onClick?: () => void
}) {
  const isLocked = topic.status === "locked"
  const isCompleted = topic.status === "completed"
  const isActive = topic.status === "active"

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full bg-card rounded-xl p-4 text-left transition-all ${
        isActive ? "border-2 border-primary" : "border-2 border-transparent"
      } ${isLocked ? "opacity-50" : "hover:brightness-110 active:scale-[0.98]"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isCompleted && (
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <Check className="text-accent-foreground" size={14} />
            </div>
          )}
          {isActive && <ChevronRight className="text-primary" size={20} />}
          {isLocked && <Lock className="text-muted-foreground" size={18} />}
          <span className={`font-medium ${isLocked ? "text-muted-foreground" : "text-foreground"}`}>
            {topic.name}
          </span>
        </div>

        {topic.badge && (
          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">
            {topic.badge}
          </span>
        )}
      </div>

      {topic.progress !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${topic.progress}%` }}
            />
          </div>
          <p className="text-muted-foreground text-xs mt-1">{topic.progress}% completado</p>
        </div>
      )}
    </button>
  )
}

export function ToggleRow({
  label,
  enabled,
  onToggle
}: {
  label: string
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-foreground">{label}</span>
      <button
        onClick={onToggle}
        className={`w-12 h-7 rounded-full transition-all relative ${
          enabled ? "bg-accent" : "bg-muted-foreground/30"
        }`}
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-foreground transition-all ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  )
}
