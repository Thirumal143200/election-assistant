import { useState } from 'react'
import { Landmark, ListTodo, BookOpen, MessageSquare, HelpCircle } from 'lucide-react'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Flashcards from './components/Flashcards'
import AssistantChat from './components/AssistantChat'
import Quiz from './components/Quiz'
import './App.css'

const tabs = [
  { id: 'timeline', label: 'Process', icon: <ListTodo size={16} /> },
  { id: 'learn',    label: 'Learn',   icon: <BookOpen size={16} /> },
  { id: 'quiz',     label: 'Quiz',    icon: <HelpCircle size={16} /> },
  { id: 'assistant',label: 'Assistant',icon: <MessageSquare size={16} /> },
]

function App() {
  const [activeTab, setActiveTab] = useState('timeline')

  return (
    <div className="app-shell">
      {/* ─── Navbar ─── */}
      <header className="navbar glass">
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="brand-icon"><Landmark size={20} /></div>
            <span className="brand-text text-gradient">Election Copilot</span>
          </div>
          <nav className="nav-pills">
            {tabs.map(t => (
              <button
                key={t.id}
                className={`pill ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── Hero (only on timeline tab) ─── */}
      {activeTab === 'timeline' && <Hero />}

      {/* ─── Main content ─── */}
      <main className="container main-content">
        <div key={activeTab} className="tab-panel animate-fade-in-up">
          {activeTab === 'timeline'  && <Timeline />}
          {activeTab === 'learn'     && <Flashcards />}
          {activeTab === 'quiz'      && <Quiz />}
          {activeTab === 'assistant' && <AssistantChat />}
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="app-footer">
        <p>Built with ❤️ to empower every voter · <span className="text-gradient">Election Copilot</span></p>
      </footer>
    </div>
  )
}

export default App
