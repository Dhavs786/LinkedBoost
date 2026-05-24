import { useState, useRef } from 'react'
import { Upload, FileText, Loader2, CheckCircle2, X } from 'lucide-react'

export default function ProfileUpload({ onAnalyze, loading }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    validateAndSetFile(selectedFile)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    validateAndSetFile(droppedFile)
  }

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else if (selectedFile) {
      alert("Please upload a valid PDF file.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (file) {
      onAnalyze(file)
    }
  }

  const clearFile = (e) => {
    e.stopPropagation()
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto flex flex-col gap-5">
      
      {/* Drop Zone */}
      <div 
        className={`relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden group ${
          isDragging 
            ? 'bg-primary/5 border-2 border-primary shadow-lg shadow-primary/8 scale-[1.01]' 
            : file 
              ? 'bg-emerald-50/50 border-2 border-emerald-300/60 shadow-sm' 
              : 'bg-white/50 border-2 border-dashed border-slate-200 hover:border-primary/40 hover:bg-white/80 shadow-sm hover:shadow-md'
        }`}
        onClick={() => !file && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
          disabled={loading}
        />

        {file ? (
          /* ─── File Selected State ─── */
          <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400">{formatSize(file.size)}</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Ready
                </span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={clearFile}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          /* ─── Empty State ─── */
          <>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-400/10 text-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <Upload className={`h-7 w-7 transition-transform duration-300 ${isDragging ? '-translate-y-1' : ''}`} />
            </div>
            <p className="text-base font-bold text-slate-800 mb-1">
              {isDragging ? 'Drop your PDF here' : 'Drop your LinkedIn PDF here'}
            </p>
            <p className="text-sm text-slate-400 mb-4">
              or <span className="text-primary font-semibold cursor-pointer hover:underline">browse files</span>
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
              <span>LinkedIn Profile</span>
              <span className="text-slate-300">›</span>
              <span>More</span>
              <span className="text-slate-300">›</span>
              <span className="text-primary font-semibold">Save to PDF</span>
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !file}
        className={`relative overflow-hidden w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98] ${
          file 
            ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110' 
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating AI Enhancements...
          </>
        ) : (
          'Analyze My Profile'
        )}
      </button>
    </form>
  )
}
