import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Files, Check, ArrowLeft, Terminal } from 'lucide-react';

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/pastes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setContent(data.content);
        setLoading(false);
      })
      .catch(() => {
        setContent("404: Paste not found or has expired.");
        setLoading(false);
      });
  }, [id]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 selection:bg-cyan-500/30">
      
      {/* Navigation / Header */}
      <div className="w-full max-w-4xl mb-6 flex justify-between items-center px-2">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">
          <ArrowLeft size={18} /> Back to Editor
        </Link>
        <div className="flex items-center gap-2 text-white font-black tracking-tighter italic">
          <Terminal className="text-cyan-500" size={20} /> PASTEBIN
        </div>
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-4xl p-px rounded-2xl bg-linear-to-br from-cyan-500/30 via-slate-500/30 to-purple-500/30 shadow-2xl">
        <div className="bg-slate-950/90 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col">
          
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs font-mono tracking-widest uppercase font-bold">Read-Only Mode</span>
            </div>
            <button 
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                copied ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {copied ? <Check size={14} /> : <Files size={14} />}
              {copied ? "COPIED" : "COPY CONTENT"}
            </button>
          </div>

          {/* Content Area */}
          <div className="relative">
            {loading ? (
              <div className="h-80 flex items-center justify-center text-slate-500 font-mono animate-pulse">
                Fetching secure data...
              </div>
            ) : (
              <pre className="w-full h-auto min-h-80 max-h-150 overflow-auto bg-transparent p-8 text-cyan-50 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {content}
              </pre>
            )}
            
            {/* Footer Stats */}
            <div className="px-6 py-2 bg-black/40 border-t border-white/5 flex gap-6 text-[10px] text-slate-500 font-mono uppercase tracking-tighter">
              <span>Status: Encrypted</span>
              <span>ID: {id}</span>
              <span>Size: {new Blob([content]).size} bytes</span>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <p className="mt-8 text-slate-600 text-[11px] font-mono">
        This paste is hosted securely on PasteBin. Ensure you trust the sender of the link.
      </p>
    </div>
  );
}