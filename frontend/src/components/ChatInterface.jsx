import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Send, User, Bot, Loader2, MessageCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function ChatInterface({ profileData }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your AI career coach. Ask me anything — how to improve this profile, prepare for interviews, or rewrite a specific section." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await axios.post(`${API}/api/chat`, {
        question: userMessage,
        profile_data: profileData
      })
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that request. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    "Rewrite my headline",
    "Improve my summary",
    "Interview tips"
  ]

  return (
    <div className="glass-panel-solid flex flex-col h-[600px] xl:h-[calc(100vh-140px)] xl:sticky xl:top-[100px] overflow-hidden">
      
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark px-5 py-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base tracking-tight leading-none">AI Career Coach</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-[pulse-soft_2s_ease-in-out_infinite]"></span>
              <span className="text-[11px] text-blue-100 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 bg-gradient-to-b from-slate-50/50 to-white/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-sm' 
                : 'bg-white border border-slate-200 text-primary shadow-sm'
            }`}>
              {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={`px-4 py-3 max-w-[82%] text-[14px] leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl rounded-tr-md shadow-sm' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-md shadow-sm premium-prose prose-sm'
            }`}>
              {msg.role === 'user' ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-primary flex items-center justify-center shadow-sm">
              <Bot className="h-4 w-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-white border border-slate-100 shadow-sm flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:0ms]"></span>
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:150ms]"></span>
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:300ms]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setInput(q); }}
              className="text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-full border border-primary/15 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 sm:p-4 bg-white/60 backdrop-blur-md border-t border-slate-100">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about the profile..."
            className="w-full pl-5 pr-13 py-3.5 bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white rounded-2xl text-sm focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all placeholder:text-slate-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-1.5 w-9 h-9 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-90"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
