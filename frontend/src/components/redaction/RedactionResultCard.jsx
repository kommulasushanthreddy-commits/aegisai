import React, { useState } from 'react';
import EntityHighlighter from './EntityHighlighter';
import { ShieldCheck, Copy, Check, Send, Lock, Unlock, Sparkles, Bot, Eye, EyeOff } from 'lucide-react';
import { AiBadge } from '../common/Badge';

const RedactionResultCard = ({ scanResult, onSendToAI, isSendingAI, aiResult }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [showUnmaskedResponse, setShowUnmaskedResponse] = useState(true);

  if (!scanResult) return null;

  const { originalPrompt, maskedPrompt, entities = [] } = scanResult;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt') {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  const entityTypeCounts = entities.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Safeguard Active */}
      <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex flex-wrap items-center justify-between gap-4 shadow-glow-teal">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-100">Redaction Engine Intercepted Prompt</h3>
              <AiBadge label="Redaction Shield Active" />
            </div>
            <p className="text-xs text-slate-300">
              {entities.length > 0
                ? `Detected ${entities.length} sensitive item${entities.length > 1 ? 's' : ''} (PII, credentials, or internal org references) and replaced them with secure placeholders.`
                : 'No sensitive entities detected. Prompt is safe for public AI models.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => copyToClipboard(maskedPrompt, 'prompt')}
          className="px-3 py-1.5 rounded-lg bg-[#182030] hover:bg-[#2a344a] text-slate-300 text-xs font-mono border border-[#1e2638] flex items-center gap-1.5 transition-colors"
        >
          {copiedPrompt ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedPrompt ? 'Copied Masked Prompt' : 'Copy Masked Prompt'}</span>
        </button>
      </div>

      {/* Entity Chips Breakdown Row */}
      {entities.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-[#121723] rounded-xl border border-[#1e2638]">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Caught Entities:
          </span>
          {Object.entries(entityTypeCounts).map(([type, count]) => (
            <span
              key={type}
              className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              <span>{type}</span>
              <span className="bg-teal-500/20 px-1.5 py-0.5 rounded-full text-[10px] text-teal-200 font-bold">
                x{count}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Side-by-Side Before vs After Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Original Text with Highlights */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Unlock className="w-3.5 h-3.5 text-amber-400" /> Original Input (Local Browser)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">NEVER SENT TO AI</span>
          </div>
          <EntityHighlighter text={originalPrompt} entities={entities} />
        </div>

        {/* Right: Masked Prompt for AI Model */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-400" /> Masked Safe Version
            </span>
            <span className="text-[11px] text-teal-400 font-mono">FORWARDS TO AI GATEWAY</span>
          </div>
          <div className="whitespace-pre-wrap font-mono text-sm text-teal-200 leading-relaxed bg-[#0a0d14] p-4 rounded-xl border border-teal-500/30 shadow-glow-teal min-h-[140px]">
            {maskedPrompt}
          </div>
        </div>

      </div>

      {/* Action Button: Send Masked Prompt to AI Model */}
      <div className="pt-2 flex flex-col items-center">
        {!aiResult && (
          <button
            onClick={onSendToAI}
            disabled={isSendingAI}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-bold hover:from-teal-400 hover:to-emerald-500 transition-all shadow-glow-teal flex items-center gap-2 disabled:opacity-50 text-sm"
          >
            {isSendingAI ? (
              <>
                <Bot className="w-5 h-5 animate-spin text-slate-950" />
                <span>AI Security Gateway Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Send Masked Prompt to AI Model</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* AI Reply Display (Masked vs Unmasked) */}
      {aiResult && (
        <div className="mt-8 p-6 rounded-2xl bg-[#121723] border border-teal-500/30 shadow-glow-teal space-y-4 animate-fadeIn">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e2638] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  AI Model Response
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    GATEWAY REASSEMBLED
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  The model only saw masked tokens. AegisAI unmasked the response securely for your browser session.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowUnmaskedResponse(!showUnmaskedResponse)}
                className="px-3 py-1.5 rounded-lg bg-[#182030] hover:bg-[#2a344a] text-slate-300 text-xs font-mono border border-[#1e2638] flex items-center gap-1.5 transition-colors"
              >
                {showUnmaskedResponse ? <EyeOff className="w-3.5 h-3.5 text-teal-400" /> : <Eye className="w-3.5 h-3.5 text-amber-400" />}
                <span>{showUnmaskedResponse ? 'View Masked Model Raw Reply' : 'Unmask For My Eyes Only'}</span>
              </button>

              <button
                onClick={() => copyToClipboard(showUnmaskedResponse ? aiResult.aiResponseUnmasked : aiResult.aiResponseMasked, 'response')}
                className="px-3 py-1.5 rounded-lg bg-[#182030] hover:bg-[#2a344a] text-slate-300 text-xs font-mono border border-[#1e2638] flex items-center gap-1.5 transition-colors"
              >
                {copiedResponse ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedResponse ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Response Container */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={showUnmaskedResponse ? "text-teal-300 flex items-center gap-1" : "text-amber-400 flex items-center gap-1"}>
                {showUnmaskedResponse ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" /> UNMASKED VIEW (Authorized Submitter Only)
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" /> WHAT LEFT THE BROWSER / MODEL RAW
                  </>
                )}
              </span>
            </div>

            <div className={`p-4 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap border ${
              showUnmaskedResponse
                ? 'bg-[#0a0d14] text-slate-200 border-teal-500/40 shadow-inner'
                : 'bg-[#0a0d14] text-amber-200/90 border-amber-500/30'
            }`}>
              {showUnmaskedResponse ? aiResult.aiResponseUnmasked : aiResult.aiResponseMasked}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default RedactionResultCard;
