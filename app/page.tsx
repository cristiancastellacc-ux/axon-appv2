"use client"

import { useState } from "react"
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Lock,
  Check,
  Menu,
  X,
  Star,
  Zap,
  Clock,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Send,
  ChevronDown,
  Play,
  FileText,
  MessageCircle,
  Camera,
  AlertTriangle,
  RefreshCw,
  Settings,
  LogOut,
  Paperclip
} from "lucide-react"

import HomeScreen from "@/components/screens/HomeScreen";
import MenuScreen from "@/components/screens/MenuScreen";

type Screen = "home" | "menu" | "subject" | "study" | "test" | "progress" | "profile" | "subtopics" | "studyView" | "exercise" | "miniTest" | "completed" | "surpriseExam" | "quickSession" | "notes" | "tutorChat"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");

export default function AxonApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [previousScreen, setPreviousScreen] = useState<Screen>("home")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [screenHistory, setScreenHistory] = useState<Screen[]>(["home"])
  const [quickSessionTime, setQuickSessionTime] = useState(20)
  const [notesTab, setNotesTab] = useState<"notes" | "formulas">("notes")
  const [chatMessages, setChatMessages] = useState([
    { from: "ai", text: "Hola. Estás viendo Límites al infinito. ¿Qué parte no quedó clara?" },
    { from: "user", text: "No entiendo por qué 1/x tiende a 0 cuando x es muy grande" },
    { from: "ai", text: "Pensalo así: si dividís 1 entre un número enorme, el resultado se hace cada vez más chico. Si x = 1.000.000, entonces 1/x = 0,000001. Cuanto más grande x, más cerca de 0." },
    { from: "user", text: "Ah, tiene sentido. ¿Y si el numerador también crece?" },
    { from: "ai", text: "Eso depende de cuál crece más rápido. Si ambos crecen igual, el límite es una constante. Ejemplo: lim(x→∞) de 3x/x = 3.", isCard: true },
  ])

  const navigateTo = (screen: Screen) => {
    setPreviousScreen(currentScreen)
    setScreenHistory(prev => [...prev, screen])
    setCurrentScreen(screen)
  }

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory]
      newHistory.pop()
      setScreenHistory(newHistory)
      setCurrentScreen(newHistory[newHistory.length - 1])
    } else {
      setCurrentScreen("home")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Circuit grid background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <CircuitPattern />
      </div>
      
      {/* Phone frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-background rounded-[40px] border-[8px] border-[#1A3A5C] shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="h-12 flex items-center justify-between px-6 text-foreground text-sm">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-foreground rounded-sm relative">
              <div className="absolute inset-[2px] right-1 bg-foreground rounded-sm" />
            </div>
          </div>
        </div>

        {/* Screen content with transitions */}
        <div className="relative h-[calc(100%-48px-80px)] overflow-hidden">
          <ScreenContainer isActive={currentScreen === "home"}>
            <HomeScreen 
              onOpenMenu={() => navigateTo("menu")} 
              onContinueStudy={() => navigateTo("subject")}
              onQuickSession={() => navigateTo("quickSession")}
              onSurpriseExam={() => navigateTo("surpriseExam")}
            />
          </ScreenContainer>
          
          <ScreenContainer isActive={currentScreen === "menu"}>
            <MenuScreen 
              onClose={() => navigateTo("home")} 
              onSelectSubject={() => navigateTo("subject")}
            />
          </ScreenContainer>
          
          <ScreenContainer isActive={currentScreen === "subject"}>
            <SubjectScreen 
              onBack={goBack}
              onSelectTopic={() => navigateTo("subtopics")}
            />
          </ScreenContainer>
          
          <ScreenContainer isActive={currentScreen === "study"}>
            <StudyScreen 
              onBack={goBack}
              onNext={() => navigateTo("test")}
            />
          </ScreenContainer>
          
          <ScreenContainer isActive={currentScreen === "test"}>
            <TestScreen 
              onBack={goBack}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={setSelectedAnswer}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "progress"}>
            <ProgressScreen onBack={() => navigateTo("home")} />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "profile"}>
            <ProfileScreen 
              onBack={() => navigateTo("home")} 
              onOpenNotes={() => navigateTo("notes")}
              onOpenTutor={() => navigateTo("tutorChat")}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "subtopics"}>
            <SubtopicListScreen 
              onBack={goBack}
              onSelectSubtopic={() => navigateTo("studyView")}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "studyView"}>
            <StudyViewScreen 
              onBack={goBack}
              onNext={() => navigateTo("exercise")}
              onOpenTutor={() => navigateTo("tutorChat")}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "exercise"}>
            <ExerciseScreen 
              onBack={goBack}
              onNext={() => navigateTo("miniTest")}
              onOpenTutor={() => navigateTo("tutorChat")}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "miniTest"}>
            <MiniTestScreen 
              onClose={goBack}
              onComplete={() => navigateTo("completed")}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "completed"}>
            <TopicCompletedScreen 
              onNextTopic={() => navigateTo("subtopics")}
              onReview={() => navigateTo("studyView")}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "surpriseExam"}>
            <SurpriseExamScreen onBack={() => navigateTo("home")} />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "quickSession"}>
            <QuickSessionScreen 
              onBack={() => navigateTo("home")}
              selectedTime={quickSessionTime}
              onSelectTime={setQuickSessionTime}
              onStart={() => navigateTo("studyView")}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "notes"}>
            <NotesScreen 
              onBack={goBack}
              activeTab={notesTab}
              onTabChange={setNotesTab}
            />
          </ScreenContainer>

          <ScreenContainer isActive={currentScreen === "tutorChat"}>
            <TutorChatScreen 
              onClose={goBack}
              messages={chatMessages}
            />
          </ScreenContainer>
        </div>

        {/* Bottom navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-card border-t border-border">
          <div className="flex items-center justify-around h-full px-4">
            <NavButton 
              icon={<Home size={24} />} 
              label="Inicio" 
              isActive={currentScreen === "home"}
              onClick={() => navigateTo("home")}
              activeColor="#2B7FFF"
            />
            <NavButton 
              icon={<BookOpen size={24} />} 
              label="Materias" 
              isActive={currentScreen === "menu" || currentScreen === "subject"}
              onClick={() => navigateTo("menu")}
              activeColor="#FF8C42"
            />
            <NavButton 
              icon={<BarChart3 size={24} />} 
              label="Progreso" 
              isActive={currentScreen === "progress"}
              onClick={() => navigateTo("progress")}
              activeColor="#00D4C8"
            />
            <NavButton 
              icon={<User size={24} />} 
              label="Perfil" 
              isActive={currentScreen === "profile"}
              onClick={() => navigateTo("profile")}
              activeColor="#9B59FF"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CircuitPattern() {
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

function ScreenContainer({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
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

function NavButton({ 
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

// ============ SCREEN 1: HOME ============
function HomeScreen({ 
  onOpenMenu, 
  onContinueStudy,
  onQuickSession,
  onSurpriseExam
}: { 
  onOpenMenu: () => void
  onContinueStudy: () => void
  onQuickSession: () => void
  onSurpriseExam: () => void
}) {
  return (
    <div className="h-full px-5 py-4 overflow-y-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onOpenMenu} className="p-1">
          <Menu className="text-primary" size={24} />
        </button>
        <h1 className="text-primary font-bold text-xl tracking-[0.3em]">AXON</h1>
        <div className="flex items-center gap-1 text-accent">
          <span>🔥</span>
          <span className="text-sm font-medium">5 días</span>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-6">
        <div className="h-1.5 bg-card rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: "42%" }} />
        </div>
        <p className="text-muted-foreground text-xs mt-1">42% completado</p>
      </div>

      {/* Main continue card */}
      <div className="bg-card rounded-xl p-5 mb-4">
        <p className="text-muted-foreground text-xs mb-1">Continuar</p>
        <h2 className="text-foreground text-2xl font-semibold mb-3">Funciones</h2>
        
        <div className="mb-4">
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
          </div>
          <p className="text-muted-foreground text-xs mt-1">60% completado</p>
        </div>

        <button 
          onClick={onContinueStudy}
          className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Seguir estudiando
        </button>
      </div>

      {/* Quick actions row - 3 buttons */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={onQuickSession}
          className="flex-1 border border-primary text-primary text-sm font-medium py-3 rounded-[10px] transition-all hover:bg-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Clock size={16} />
          Sesion rapida
        </button>
        <button 
          onClick={onSurpriseExam}
          className="flex-1 border border-primary text-primary text-sm font-medium py-3 rounded-[10px] transition-all hover:bg-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Zap size={16} />
          Examen
        </button>
        <button 
          className="flex-1 border border-primary text-primary text-sm font-medium py-3 rounded-[10px] transition-all hover:bg-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} />
          Repasar
        </button>
      </div>

      {/* AI Recommendation card - teal left border */}
      <div className="bg-card rounded-xl rounded-l-none border-l-4 border-l-accent p-4 mb-4">
        <p className="text-accent text-xs font-medium mb-1">Axon recomienda</p>
        <p className="text-foreground text-sm mb-1">
          Te conviene repasar <span className="text-accent font-medium">Derivadas</span> antes del examen
        </p>
        <p className="text-muted-foreground text-xs">Hace 4 dias que no la ves</p>
      </div>

      {/* Motivation row - 2 mini cards */}
      <div className="flex gap-3">
        <div className="flex-1 bg-card rounded-xl p-4 text-center">
          <p className="text-[#F1C40F] text-2xl font-bold">42</p>
          <p className="text-muted-foreground text-xs">dias de racha</p>
        </div>
        <div className="flex-1 bg-card rounded-xl p-4 text-center">
          <p className="text-primary text-2xl font-bold">18</p>
          <p className="text-muted-foreground text-xs">temas vistos</p>
        </div>
      </div>
    </div>
  )
}

// ============ SCREEN 2: SIDE MENU ============
function MenuScreen({ 
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
    { name: "Programación", color: "#4A6A8A", progress: 0, active: false },
  ]

  return (
    <div className="h-full bg-background px-5 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-primary font-bold text-xl tracking-[0.3em]">AXON</h1>
        <button onClick={onClose} className="p-1">
          <X className="text-muted-foreground" size={24} />
        </button>
      </div>

      {/* User avatar */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
          JD
        </div>
        <div>
          <p className="text-foreground font-medium">Juan Díaz</p>
          <p className="text-muted-foreground text-sm">Estudiante</p>
        </div>
      </div>

      {/* Section label */}
      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4">
        Tecnicatura en Robótica
      </p>

      {/* Subject cards */}
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
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: subject.color }}
              />
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

// ============ SCREEN 3: SUBJECT (MATEMÁTICA) ============
function SubjectScreen({ 
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
    { name: "Integrales", status: "locked" },
  ]

  return (
    <div className="h-full px-5 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Matemática</h1>
      </div>

      {/* Topic list */}
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

function TopicCard({ 
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
          {isActive && (
            <ChevronRight className="text-primary" size={20} />
          )}
          {isLocked && (
            <Lock className="text-muted-foreground" size={18} />
          )}
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

// ============ SCREEN 4: STUDY ============
function StudyScreen({ 
  onBack, 
  onNext 
}: { 
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="h-full px-5 py-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="text-foreground" size={24} />
          </button>
          <h1 className="text-foreground text-lg font-semibold">Límites</h1>
        </div>
        
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        </div>
      </div>

      {/* Content card */}
      <div className="flex-1 bg-card rounded-xl p-5 mb-4 overflow-y-auto">
        <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-3">
          Concepto
        </span>
        
        <p className="text-foreground leading-relaxed mb-4">
          Un <span className="text-accent font-medium">límite</span> describe el valor al que se aproxima 
          una función cuando su variable independiente se acerca a un punto específico. Es la base del 
          cálculo diferencial e integral.
        </p>

        <p className="text-foreground leading-relaxed mb-6">
          Matemáticamente, escribimos: <span className="font-mono text-accent">lim x→a f(x) = L</span>
        </p>

        {/* Diagram placeholder */}
        <div className="border-2 border-dashed border-border rounded-xl p-8 flex items-center justify-center mb-4">
          <div className="text-center">
            <div className="text-muted-foreground text-4xl mb-2">📈</div>
            <p className="text-muted-foreground text-sm">Gráfico interactivo</p>
          </div>
        </div>

        {/* Application badge */}
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full">
          <span className="text-xs">🤖</span>
          <span className="text-xs font-medium">Aplicación en robótica</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button 
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Siguiente
        </button>
        <button className="w-full border border-border text-foreground font-medium py-3.5 rounded-[10px] transition-all hover:bg-card active:scale-[0.98]">
          Explicame de otra forma
        </button>
      </div>
    </div>
  )
}

// ============ SCREEN 5: MINI TEST ============
function TestScreen({ 
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
      {/* Header with progress */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        
        {/* Progress indicator - dot 2 is active/wide */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-6 h-2.5 rounded-full bg-primary" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="w-8" /> {/* Spacer for alignment */}
      </div>

      {/* Question card */}
      <div className="bg-card rounded-xl p-5 mb-6">
        <p className="text-foreground text-lg leading-relaxed">
          ¿Cuál es el límite de <span className="font-mono text-accent">f(x) = 2x</span> cuando{" "}
          <span className="font-mono text-accent">x → 3</span>?
        </p>
      </div>

      {/* Answer options */}
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

      {/* Submit button */}
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

// ============ SCREEN 6: PROGRESS ============
function ProgressScreen({ onBack }: { onBack: () => void }) {
  const stats = [
    { value: "42", label: "dias de racha", color: "#00D4C8", border: true },
    { value: "18", label: "temas completados", color: "#2B7FFF", border: false },
    { value: "38 hs", label: "tiempo total", color: "#FF8C42", border: false },
    { value: "73%", label: "promedio examenes", color: "#2ECC71", border: false },
  ]

  const subjects = [
    { name: "Matematica", progress: 68, color: "#2B7FFF" },
    { name: "Fisica", progress: 35, color: "#2B7FFF" },
    { name: "Electronica", progress: 12, color: "#4A6A8A" },
    { name: "Programacion", progress: 0, color: "#4A6A8A", label: "No iniciada" },
  ]

  const weakPoints = [
    { name: "Derivadas", color: "#E74C3C" },
    { name: "Circuitos RC", color: "#E74C3C" },
    { name: "Cinematica", color: "#E74C3C" },
  ]

  const achievementsUnlocked = [
    { emoji: "⭐", label: "7 dias seguidos", color: "#F1C40F" },
    { emoji: "✓", label: "Primer tema", color: "#00D4C8" },
    { emoji: "⚡", label: "10 temas vistos", color: "#FF8C42" },
    { emoji: "📄", label: "Primer PDF", color: "#9B59FF" },
  ]

  const achievementsLocked = [
    { emoji: "🔥", label: "30 dias racha" },
    { emoji: "📚", label: "50 temas" },
    { emoji: "🎓", label: "Materia completa" },
    { emoji: "🏆", label: "100 dias" },
  ]

  const errorHistory = [
    { subject: "Matematica", topic: "Derivadas parciales", times: 3 },
    { subject: "Fisica", topic: "Cinematica rotacional", times: 2 },
    { subject: "Electronica", topic: "Circuitos RC", times: 2 },
  ]

  return (
    <div className="h-full px-5 py-4 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-foreground text-xl font-bold">Mi progreso</h1>
      </div>

      {/* Stats grid 2x2 */}
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

      {/* Subject progress */}
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

      {/* Weak points - AI detected */}
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
            <AlertTriangle size={12} />
            {point.name}
          </span>
        ))}
      </div>
      <p className="text-muted-foreground text-xs mb-6">
        Basado en tus ultimos errores. La app recomienda repasar estos primero.
      </p>

      {/* Achievements - 2x4 grid */}
      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Logros</p>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {achievementsUnlocked.map((achievement) => (
          <div 
            key={achievement.label}
            className="flex flex-col items-center p-2 bg-card rounded-xl"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
              style={{ backgroundColor: `${achievement.color}20` }}
            >
              <span className="text-lg">{achievement.emoji}</span>
            </div>
            <p className="text-[9px] text-center leading-tight text-foreground">
              {achievement.label}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {achievementsLocked.map((achievement) => (
          <div 
            key={achievement.label}
            className="flex flex-col items-center p-2 bg-card/50 rounded-xl opacity-50"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 bg-muted-foreground/20">
              <Lock size={16} className="text-muted-foreground" />
            </div>
            <p className="text-[9px] text-center leading-tight text-muted-foreground">
              {achievement.label}
            </p>
          </div>
        ))}
      </div>

      {/* Error history */}
      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Historial reciente de errores</p>
      <div className="space-y-2">
        {errorHistory.map((error) => (
          <div 
            key={error.topic}
            className="bg-card rounded-xl p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                {error.subject}
              </span>
              <span className="text-foreground text-sm">{error.topic}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-destructive text-sm">{error.times}x</span>
              <button className="text-accent text-xs hover:brightness-110">
                Repasar →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ SCREEN 7: PROFILE ============
function ProfileScreen({ 
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
    { icon: Calendar, label: "Miembro desde", value: "Marzo 2025" },
  ]

  return (
    <div className="h-full px-5 py-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Perfil</h1>
      </div>

      {/* User card */}
      <div className="bg-card rounded-xl p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            JR
          </div>
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

      {/* Career info */}
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

      {/* Study mode toggles */}
      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Modo de estudio</p>
      <div className="bg-card rounded-xl mb-6 divide-y divide-border">
        <ToggleRow label="Modo IA" enabled={aiMode} onToggle={() => setAiMode(!aiMode)} />
        <ToggleRow label="Notificaciones" enabled={notifications} onToggle={() => setNotifications(!notifications)} />
        <ToggleRow label="Modo oscuro" enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      </div>

      {/* Account options */}
      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Cuenta</p>
      <div className="bg-card rounded-xl divide-y divide-border mb-4">
        <button 
          onClick={onOpenNotes}
          className="w-full p-4 text-left text-foreground hover:bg-background/50 transition-colors flex items-center gap-3"
        >
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

      {/* Logout */}
      <button className="w-full p-4 text-center text-destructive hover:bg-destructive/10 rounded-xl transition-colors flex items-center justify-center gap-2">
        <LogOut size={18} />
        Cerrar sesion
      </button>
    </div>
  )
}

function ToggleRow({ 
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

// ============ SCREEN A: SUBTOPIC LIST ============
function SubtopicListScreen({ 
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
    { name: "Límites indeterminados", status: "locked" },
  ]

  return (
    <div className="h-full px-5 py-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Límites</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-6 ml-9">4 subtemas · 2 completados</p>

      {/* Subtopic list */}
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
                isCompleted ? "bg-accent/20 text-accent" : 
                isInProgress ? "bg-primary/20 text-primary" : 
                "bg-muted-foreground/20 text-muted-foreground"
              }`}>
                {isCompleted ? "Completado" : isInProgress ? "En progreso" : "Bloqueado"}
              </span>
            </button>
          )
        })}
      </div>

      {/* Continue button */}
      <button 
        onClick={onSelectSubtopic}
        className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98] mt-4"
      >
        Continuar: Límites al infinito
      </button>
    </div>
  )
}

// ============ SCREEN B: STUDY VIEW ============
function StudyViewScreen({ 
  onBack, 
  onNext,
  onOpenTutor
}: { 
  onBack: () => void
  onNext: () => void
  onOpenTutor: () => void
}) {
  return (
    <div className="h-full px-5 py-4 flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="text-foreground" size={24} />
          </button>
          <h1 className="text-foreground text-lg font-semibold">Límites al infinito</h1>
        </div>
        
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        </div>
      </div>

      {/* Tutor IA floating button */}
      <button 
        onClick={onOpenTutor}
        className="absolute top-4 right-5 bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full hover:brightness-110 active:scale-[0.98] transition-all z-10"
      >
        Tutor IA
      </button>

      {/* Content card */}
      <div className="flex-1 bg-card rounded-xl p-5 mb-4 overflow-y-auto">
        <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-3">
          Concepto
        </span>
        
        <p className="text-foreground leading-relaxed mb-4">
          Un <span className="text-accent font-medium">límite al infinito</span> describe el comportamiento de f(x) cuando x crece sin límite. Si f(x) = 1/x, el límite cuando x→∞ es 0.
        </p>

        {/* Diagram placeholder */}
        <div className="border-2 border-dashed border-border rounded-xl p-6 flex items-center justify-center mb-4 bg-background/50">
          <p className="text-muted-foreground text-sm">gráfico de f(x)=1/x</p>
        </div>

        {/* Application badge */}
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full mb-6">
          <span className="text-xs font-medium">Aplicación en robótica</span>
        </div>

        <span className="inline-block text-primary text-xs font-semibold uppercase tracking-wider mb-3">
          Ejemplo
        </span>
        
        <p className="text-foreground leading-relaxed">
          Si un robot se aleja indefinidamente, su velocidad angular tiende a 0.
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button 
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Siguiente
        </button>
        <button className="w-full border border-border text-foreground font-medium py-3.5 rounded-[10px] transition-all hover:bg-card active:scale-[0.98]">
          Explicame de otra forma
        </button>
      </div>
    </div>
  )
}

// ============ SCREEN C: MINI TEST ============
function MiniTestScreen({ 
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-foreground text-lg font-semibold">Mini test · Límites al infinito</h1>
        <button onClick={onClose} className="p-1">
          <X className="text-muted-foreground" size={24} />
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-muted-foreground text-sm">Pregunta 2 de 3</span>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-6 h-2.5 rounded-full bg-primary" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-card rounded-xl p-5 mb-6">
        <p className="text-foreground text-lg leading-relaxed">
          Si <span className="font-mono text-accent">f(x) = 5/x²</span>, ¿cuál es el límite cuando{" "}
          <span className="font-mono text-accent">x → ∞</span>?
        </p>
      </div>

      {/* Answer options */}
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

      {/* Helper text */}
      <p className="text-muted-foreground text-xs text-center mb-4">
        Podés cambiar tu respuesta antes de confirmar.
      </p>

      {/* Submit button */}
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

// ============ SCREEN D: TOPIC COMPLETED ============
function TopicCompletedScreen({ 
  onNextTopic, 
  onReview 
}: { 
  onNextTopic: () => void
  onReview: () => void
}) {
  const summaryPoints = [
    "Los límites al infinito describen el comportamiento extremo",
    "Si el denominador crece, el límite tiende a 0",
    "Aplicación: control de velocidad en robótica"
  ]

  return (
    <div className="h-full px-5 py-4 flex flex-col items-center justify-center relative">
      {/* XP badge */}
      <div className="absolute top-4 right-5 bg-accent/20 text-accent px-3 py-1.5 rounded-full">
        <span className="text-sm font-medium">+15 XP</span>
      </div>

      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
        <Check className="text-accent-foreground" size={40} />
      </div>

      {/* Title */}
      <h1 className="text-foreground text-2xl font-bold mb-2 text-center">
        Límites al infinito completado!
      </h1>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-2">
        <span className="text-muted-foreground text-sm">Nivel de dominio:</span>
        <span className="text-accent font-medium ml-1">Alto</span>
      </div>
      <div className="flex items-center gap-1 mb-6">
        <Star className="text-accent fill-accent" size={20} />
        <Star className="text-accent fill-accent" size={20} />
        <Star className="text-accent fill-accent" size={20} />
      </div>

      {/* Summary card */}
      <div className="w-full bg-card rounded-xl p-5 mb-6">
        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Resumen</p>
        <ul className="space-y-2">
          {summaryPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span className="text-foreground text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-3">
        <button 
          onClick={onNextTopic}
          className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-[10px] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Siguiente tema
        </button>
        <button 
          onClick={onReview}
          className="w-full border border-border text-foreground font-medium py-3.5 rounded-[10px] transition-all hover:bg-card active:scale-[0.98]"
        >
          Repasar este tema
        </button>
      </div>
    </div>
  )
}

// ============ SCREEN E: SURPRISE EXAM ============
function SurpriseExamScreen({ onBack }: { onBack: () => void }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>("Aceleración")
  const answers = ["Velocidad lineal", "Aceleración", "Fuerza angular", "Posición absoluta"]

  return (
    <div className="h-full px-5 py-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-foreground text-lg font-semibold">Examen sorpresa</h1>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
            10 preguntas
          </span>
        </div>
        <button onClick={onBack} className="text-destructive text-sm font-medium">
          Abandonar
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-2 bg-card rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: "30%" }} />
        </div>
      </div>

      {/* Question label */}
      <p className="text-muted-foreground text-sm mb-4">Pregunta 3 · Física</p>

      {/* Question card */}
      <div className="bg-card rounded-xl p-5 mb-6">
        <p className="text-foreground text-lg leading-relaxed">
          ¿Qué magnitud mide el acelerómetro de un robot?
        </p>
      </div>

      {/* Answer options */}
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
                {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
              </div>
              <span className={`text-base ${isSelected ? "text-primary" : "text-foreground"}`}>
                {answer}
              </span>
            </button>
          )
        })}
      </div>

      {/* Next button */}
      <button 
        className={`w-full font-medium py-3.5 rounded-[10px] transition-all ${
          selectedAnswer 
            ? "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98]" 
            : "bg-card text-muted-foreground cursor-not-allowed"
        }`}
        disabled={!selectedAnswer}
      >
        Siguiente pregunta
      </button>
    </div>
  )
}

// ============ SCREEN F: QUICK SESSION ============
function QuickSessionScreen({ 
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Sesión rápida</h1>
      </div>

      {/* Time selector */}
      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Duración</p>
      <div className="flex gap-3 mb-6">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`flex-1 py-3 rounded-full font-medium text-sm transition-all ${
              selectedTime === time 
                ? "bg-primary text-primary-foreground" 
                : "bg-card text-foreground hover:brightness-110"
            } active:scale-[0.98]`}
          >
            {time} min
          </button>
        ))}
      </div>

      {/* Recommended topic */}
      <div className="bg-card rounded-xl p-5 mb-4">
        <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-2">
          Axon recomienda
        </span>
        <h2 className="text-foreground text-lg font-semibold mb-1">Límites al infinito</h2>
        <p className="text-muted-foreground text-sm mb-3">Matemática</p>
        <p className="text-muted-foreground text-xs">No lo repasaste en 3 días.</p>
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <div className="w-5 h-5 rounded border-2 border-muted-foreground" />
        <span className="text-foreground text-sm">Quiero elegir otro tema</span>
      </label>

      {/* Timer display */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#0F2235"
              strokeWidth="8"
            />
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

      {/* Start button */}
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

// ============ SCREEN G: NOTES AND FORMULAS ============
function NotesScreen({ 
  onBack,
  activeTab,
  onTabChange
}: { 
  onBack: () => void
  activeTab: "notes" | "formulas"
  onTabChange: (tab: "notes" | "formulas") => void
}) {
  const notes = [
    { title: "Truco para límites", subject: "Matemática", preview: "Multiplicar por conjugado cuando..." },
    { title: "Fórmula del acelerómetro", subject: "Física", preview: "a = Δv/Δt, útil para..." },
    { title: "Resistencias en serie", subject: "Electrónica", preview: "R_total = R1 + R2 + ..." },
  ]

  const formulas = {
    "Matemática": [
      "f'(x) = lim[f(x+h)-f(x)]/h",
      "∫f(x)dx",
      "lim(x→a) f(x) = L"
    ],
    "Física": [],
    "Electrónica": []
  }

  const [expandedSubject, setExpandedSubject] = useState<string>("Matemática")

  return (
    <div className="h-full px-5 py-4 flex flex-col relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="text-foreground" size={24} />
        </button>
        <h1 className="text-foreground text-xl font-semibold">Notas y fórmulas</h1>
      </div>

      {/* Tab row */}
      <div className="flex gap-4 mb-6 border-b border-border">
        <button 
          onClick={() => onTabChange("notes")}
          className={`pb-3 text-sm font-medium transition-all ${
            activeTab === "notes" 
              ? "text-primary border-b-2 border-primary" 
              : "text-muted-foreground"
          }`}
        >
          Mis notas
        </button>
        <button 
          onClick={() => onTabChange("formulas")}
          className={`pb-3 text-sm font-medium transition-all ${
            activeTab === "formulas" 
              ? "text-primary border-b-2 border-primary" 
              : "text-muted-foreground"
          }`}
        >
          Fórmulas
        </button>
      </div>

      {activeTab === "notes" ? (
        <>
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text"
              placeholder="Buscar notas..."
              className="w-full bg-card rounded-xl py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Notes list */}
          <div className="flex-1 space-y-3 overflow-y-auto">
            {notes.map((note) => (
              <div key={note.title} className="bg-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground font-medium">{note.title}</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {note.subject}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{note.preview}</p>
              </div>
            ))}
          </div>

          {/* Floating add button */}
          <button className="absolute bottom-20 right-5 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg hover:brightness-110 active:scale-[0.95] transition-all">
            <Plus className="text-accent-foreground" size={24} />
          </button>
        </>
      ) : (
        <div className="flex-1 space-y-3 overflow-y-auto">
          {Object.entries(formulas).map(([subject, subjectFormulas]) => (
            <div key={subject} className="bg-card rounded-xl overflow-hidden">
              <button 
                onClick={() => setExpandedSubject(expandedSubject === subject ? "" : subject)}
                className="w-full p-4 flex items-center justify-between hover:bg-background/50 transition-colors"
              >
                <span className="text-foreground font-medium">{subject}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-muted-foreground transition-transform ${
                    expandedSubject === subject ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSubject === subject && subjectFormulas.length > 0 && (
                <div className="px-4 pb-4 space-y-2">
                  {subjectFormulas.map((formula, index) => (
                    <div key={index} className="bg-background rounded-lg p-3">
                      <code className="text-accent font-mono text-sm">{formula}</code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============ SCREEN H: AI TUTOR CHAT ============
function TutorChatScreen({ 
  onClose,
  messages
}: { 
  onClose: () => void
  messages: Array<{ from: string; text: string; isCard?: boolean }>
}) {
  const [inputValue, setInputValue] = useState("")

  const suggestions = ["Dame otro ejemplo", "Relacionalo con robótica", "Más simple"]

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Tutor IA</h1>
            <span className="text-accent text-xs">En línea</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1">
          <X className="text-muted-foreground" size={24} />
        </button>
      </div>

      {/* Context pill */}
      <div className="px-5 py-3">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-full">
          <span className="text-xs font-medium">Contexto: Límites al infinito · Matemática</span>
          <button className="hover:text-primary-foreground">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-5 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.from === "ai" && (
              <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center mr-2 flex-shrink-0">
                <span className="text-accent-foreground font-bold text-xs">A</span>
              </div>
            )}
            <div 
              className={`max-w-[80%] rounded-xl p-3 ${
                message.from === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : message.isCard 
                    ? "bg-accent/20 border border-accent/30 text-foreground"
                    : "bg-card text-foreground"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestion pills */}
      <div className="px-5 py-3 flex gap-2 overflow-x-auto">
        {suggestions.map((suggestion) => (
          <button 
            key={suggestion}
            className="flex-shrink-0 bg-card text-foreground text-xs px-3 py-2 rounded-full hover:brightness-110 active:scale-[0.98] transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="px-5 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 bg-card rounded-full flex items-center justify-center hover:brightness-110 active:scale-[0.95] transition-all">
            <Paperclip className="text-accent" size={18} />
          </button>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribí tu duda..."
            className="flex-1 bg-card rounded-xl py-3 px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="w-11 h-11 bg-primary rounded-full flex items-center justify-center hover:brightness-110 active:scale-[0.95] transition-all">
            <Send className="text-primary-foreground" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ============ SCREEN 9: EXERCISE ============
function ExerciseScreen({ 
  onBack, 
  onNext,
  onOpenTutor
}: { 
  onBack: () => void
  onNext: () => void
  onOpenTutor: () => void
}) {
  const [selfEval, setSelfEval] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="h-full px-5 py-4 flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="text-foreground" size={24} />
          </button>
          <h1 className="text-foreground text-lg font-semibold">Límites al infinito</h1>
        </div>
        
        {/* Progress dots - step 3 of 5 */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        </div>
      </div>

      {/* Tutor IA floating button */}
      <button 
        onClick={onOpenTutor}
        className="absolute top-4 right-5 bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full hover:brightness-110 active:scale-[0.98] transition-all z-10"
      >
        Tutor IA
      </button>

      {/* Exercise card */}
      <div className="bg-card rounded-xl p-5 mb-4">
        <span className="inline-flex items-center gap-2 text-[#FF8C42] text-xs font-semibold uppercase tracking-wider mb-3">
          Ejercicio
        </span>
        
        <p className="text-foreground text-lg font-semibold leading-relaxed mb-3">
          Calcula el limite cuando x → ∞ de la funcion <span className="font-mono text-accent">f(x) = 3x / (x + 5)</span>
        </p>

        <p className="text-muted-foreground text-sm">
          Resolvelo en tu hoja. Desarrolla todos los pasos.
        </p>
      </div>

      {/* Timer and hint row */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 bg-[#0D1E30] text-muted-foreground px-3 py-1.5 rounded-full text-xs">
          <Clock size={14} />
          <span className="font-mono">00:00</span>
        </div>
        <button 
          onClick={() => setShowHint(!showHint)}
          className="text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          Ver pista
        </button>
      </div>

      {/* Hint card (conditional) */}
      {showHint && (
        <div className="bg-[#0D1E30] border border-border rounded-xl p-4 mb-4">
          <p className="text-muted-foreground text-sm">
            Divide numerador y denominador por la mayor potencia de x.
          </p>
        </div>
      )}

      {/* Work space placeholder */}
      <div className="flex-1 border-2 border-dashed border-border rounded-xl flex items-center justify-center mb-4">
        <p className="text-muted-foreground text-sm">Espacio de trabajo</p>
      </div>

      {/* Self evaluation */}
      <div className="mb-4">
        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Como te fue?</p>
        
        <div className="space-y-2">
          <button
            onClick={() => setSelfEval("good")}
            className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all ${
              selfEval === "good" 
                ? "bg-[#2ECC71]/20 border-2 border-[#2ECC71]" 
                : "bg-card border-2 border-transparent hover:border-border"
            }`}
          >
            <Check className={selfEval === "good" ? "text-[#2ECC71]" : "text-muted-foreground"} size={20} />
            <span className={selfEval === "good" ? "text-[#2ECC71]" : "text-foreground"}>
              Entendi completamente
            </span>
          </button>
          
          <button
            onClick={() => setSelfEval("doubt")}
            className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all ${
              selfEval === "doubt" 
                ? "bg-[#FF8C42]/20 border-2 border-[#FF8C42]" 
                : "bg-card border-2 border-transparent hover:border-border"
            }`}
          >
            <span className={`text-lg ${selfEval === "doubt" ? "text-[#FF8C42]" : "text-muted-foreground"}`}>~</span>
            <span className={selfEval === "doubt" ? "text-[#FF8C42]" : "text-foreground"}>
              Tuve alguna duda
            </span>
          </button>
          
          <button
            onClick={() => setSelfEval("bad")}
            className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all ${
              selfEval === "bad" 
                ? "bg-destructive/20 border-2 border-destructive" 
                : "bg-card border-2 border-transparent hover:border-border"
            }`}
          >
            <X className={selfEval === "bad" ? "text-destructive" : "text-muted-foreground"} size={20} />
            <span className={selfEval === "bad" ? "text-destructive" : "text-foreground"}>
              No pude resolverlo
            </span>
          </button>
        </div>
      </div>

      {/* Upload photo */}
      <button className="flex items-center justify-center gap-2 text-accent text-sm mb-4 hover:brightness-110 transition-all">
        <Camera size={18} />
        <span>Subir foto del ejercicio</span>
      </button>

      {/* Next button */}
      <button 
        onClick={onNext}
        className={`w-full font-medium py-3.5 rounded-[10px] transition-all ${
          selfEval 
            ? "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98]" 
            : "bg-card text-muted-foreground cursor-not-allowed"
        }`}
        disabled={!selfEval}
      >
        Siguiente
      </button>
    </div>
  )
}
