import { Sparkles, Loader2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ProfileSuggestions({ data, suggestions, loading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (suggestions) {
      navigator.clipboard.writeText(suggestions)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="glass-panel-solid p-8 sm:p-12 overflow-hidden relative min-h-[500px]">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-10">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/10">
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          </div>
          <div className="space-y-2">
            <div className="h-5 w-52 bg-slate-100 rounded-lg"></div>
            <div className="h-3 w-36 bg-slate-50 rounded-lg"></div>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="h-4 w-full bg-slate-100 rounded-lg"></div>
          <div className="h-4 w-11/12 bg-slate-50 rounded-lg"></div>
          <div className="h-4 w-4/5 bg-slate-50 rounded-lg"></div>
          <div className="h-8"></div>
          <div className="h-5 w-2/5 bg-slate-100 rounded-lg"></div>
          <div className="h-4 w-full bg-slate-50 rounded-lg"></div>
          <div className="h-4 w-5/6 bg-slate-50 rounded-lg"></div>
          <div className="h-4 w-3/4 bg-slate-50 rounded-lg"></div>
          <div className="h-8"></div>
          <div className="h-5 w-1/3 bg-slate-100 rounded-lg"></div>
          <div className="h-4 w-full bg-slate-50 rounded-lg"></div>
          <div className="h-4 w-11/12 bg-slate-50 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-panel-solid overflow-hidden">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 sm:px-8 py-5 sm:py-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        </div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">AI Profile Enhancements</h3>
              <p className="text-slate-400 text-xs mt-0.5 font-medium">Tailored recommendations by Gemini</p>
            </div>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 transition-all"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 sm:p-10">
        {suggestions ? (
          <div className="premium-prose">
            <ReactMarkdown>{suggestions}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-300">
            <Sparkles className="h-14 w-14 mb-5 opacity-30" />
            <p className="text-lg font-semibold text-slate-400">No suggestions generated yet.</p>
            <p className="text-sm text-slate-400 mt-1">Upload a PDF to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
