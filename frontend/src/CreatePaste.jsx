import { useState } from "react";
import { Files, Check, Send } from 'lucide-react';

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const submit = async () => {
    // Basic validation to prevent empty pastes
    if (!content.trim()) return alert("Please enter some text first!");

    const res = await fetch("http://localhost:4000/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    setUrl(data.url);
    setCopied(false); 
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 selection:bg-cyan-500/30">
      
      {/* 1. Header/Logo Area */}
      <div className="mb-8 flex items-center gap-2">
        <div className="bg-cyan-500 p-2 rounded-lg shadow-lg shadow-cyan-500/20">
          <Files className="text-slate-950 w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter italic">PASTEBIN</h1>
      </div>

      {/* 2. Main Glass Card */}
      <div className="w-full max-w-4xl p-px rounded-2xl bg-linear-to-br from-cyan-500/50 via-purple-500/50 to-blue-500/50 shadow-2xl">
        <div className="bg-slate-950/90 backdrop-blur-xl rounded-2xl overflow-hidden">
          
          {/* Decorative Header Bar */}
          <div className="px-6 py-3 border-b border-white/5 flex justify-between items-center bg-white/5">
             <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/20"></div>
              </div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Editor v1.0</p>
          </div>

          {/* Textarea Area */}
          <div className="relative">
            <textarea
              className="w-full h-80 bg-transparent p-6 text-cyan-50 font-mono text-sm focus:outline-none resize-none placeholder:text-slate-700 leading-relaxed"
              placeholder="// Paste your code or secret notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {/* Real-time stats */}
            <div className="px-6 py-2 bg-black/40 border-t border-white/5 flex gap-6 text-[10px] text-slate-500 font-mono italic">
              <span>Chars: {content.length}</span>
              <span>Lines: {content.split('\n').length}</span>
            </div>
          </div>

          {/* Footer / Actions */}
          <div className="p-4 px-6 flex justify-between items-center bg-white/5">
            <div className="text-xs text-slate-500">Ready to transmit...</div>
            <button 
              onClick={submit}
              className="flex items-center gap-2 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all transform active:scale-95 shadow-lg"
            >
              CREATE <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Result / Share URL Area */}
      {url && (
        <div className="mt-8 w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900/50 border border-cyan-500/30 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase text-cyan-500 font-bold mb-1">Share Link Created:</p>
              <p className="text-slate-300 font-mono text-sm truncate">{url}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className={`shrink-0 p-3 rounded-lg transition-all ${
                copied ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {copied ? <Check size={20} /> : <Files size={20} />}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}