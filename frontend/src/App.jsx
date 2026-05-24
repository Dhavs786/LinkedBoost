import { useState } from 'react'
import axios from 'axios'
import ProfileUpload from './components/ProfileUpload'
import ProfileSuggestions from './components/ProfileSuggestions'
import ChatInterface from './components/ChatInterface'
import { Sparkles, ArrowLeft, User, Zap } from 'lucide-react'

function App() {
  const [profileData, setProfileData] = useState(null)
  const [suggestions, setSuggestions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async (file) => {
    setLoading(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await axios.post(`${API}/api/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      setProfileData(response.data.profile)
      setSuggestions(response.data.suggestions)
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while parsing the profile PDF.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setProfileData(null)
    setSuggestions(null)
    setError(null)
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* ─── Header ─── */}
      <div className="sticky top-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4">
        <header className="max-w-[1600px] mx-auto glass-panel px-5 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg"></div>
              <img src="/logo.png" alt="LinkedBoost" className="relative h-10 w-10 rounded-xl shadow-lg object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                Linked<span className="text-primary">Boost</span>
              </h1>
              <p className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">AI Profile Enhancer</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200/60">
              <Zap className="h-3.5 w-3.5" />
              Gemini AI
            </div>
          </div>
        </header>
      </div>

      {/* ─── Main Content ─── */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-6 py-6 sm:py-10">
        
        {/* ─── Landing / Upload View ─── */}
        {!profileData && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            
            {/* Floating decorative elements */}
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-400/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]"></div>
              
              <div className="relative glass-panel p-10 sm:p-14 text-center">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-blue-400/10 text-primary font-bold text-xs tracking-wide mb-8 border border-primary/15">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI-POWERED ANALYSIS
                </div>
                
                {/* Heading */}
                <h2 className="text-4xl sm:text-[3.25rem] font-extrabold text-slate-900 mb-5 tracking-tight leading-[1.15]">
                  Make your profile
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-blue-400">
                    impossible to ignore.
                  </span>
                </h2>
                
                <p className="text-base sm:text-lg text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed">
                  Upload your LinkedIn PDF and let our AI craft personalized enhancements that help you stand out to recruiters and hiring managers.
                </p>
                
                <ProfileUpload onAnalyze={handleAnalyze} loading={loading} />
                
                {error && (
                  <div className="mt-8 p-4 bg-red-50/80 backdrop-blur-sm text-red-600 rounded-2xl border border-red-200 text-sm shadow-sm font-medium">
                    {error}
                  </div>
                )}
                
                {/* Trust indicators */}
                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    100% Free
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    No Login Required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Data Never Stored
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Loading State (full-screen) ─── */}
        {loading && !profileData && (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="glass-panel p-14 text-center max-w-lg w-full">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing your profile</h3>
              <p className="text-sm text-slate-500">Our AI is reading your experience and crafting tailored enhancements. This usually takes 10–20 seconds.</p>
            </div>
          </div>
        )}

        {/* ─── Dashboard View ─── */}
        {profileData && (
          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8">
            
            {/* Left Column – Profile + Suggestions */}
            <div className="flex-1 min-w-0 flex flex-col gap-6 sm:gap-8">
              
              {/* Profile Overview Bar */}
              <div className="glass-panel-solid p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium mt-0.5 line-clamp-1">{profileData.headline}</p>
                  </div>
                </div>
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow hover:border-primary/20 active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                  New Analysis
                </button>
              </div>
              
              {/* Suggestions Panel */}
              <ProfileSuggestions data={profileData} suggestions={suggestions} loading={loading} />
            </div>

            {/* Right Column – Chat */}
            <div className="w-full xl:w-[420px] flex-shrink-0">
              <ChatInterface profileData={profileData} />
            </div>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      {!profileData && !loading && (
        <footer className="text-center py-6 text-xs text-slate-400 font-medium">
          LinkedBoost &middot; Built with FastAPI, React &amp; Google Gemini &middot; Your data is never stored.
        </footer>
      )}
    </div>
  )
}

export default App
