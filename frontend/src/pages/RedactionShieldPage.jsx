import React, { useState } from 'react';
import { Eye, Shield, Sparkles, RefreshCw, AlertCircle, Play, FileCode, Check } from 'lucide-react';
import { scanPromptRedaction, sendMaskedPromptToAI } from '../api/redaction';
import { saveScanRecord } from '../utils/historyStorage';
import RedactionResultCard from '../components/redaction/RedactionResultCard';
import { AiBadge } from '../components/common/Badge';

const SAMPLE_PROMPTS = [
  {
    label: 'API Key & Email Leak',
    text: `Can you help me fix this Node.js script? We are initializing our database connection with secret key sk-proj-948271048291048291 and emailing logs to sarah.connor@acme-corp.com regarding Project Titan infrastructure at 10.0.4.15.`
  },
  {
    label: 'Employee PII & SSN',
    text: `Please draft a performance summary for employee John Doe (SSN 452-19-0941). Contact HR at alex.vance@dunder-mipex.com or call +1 415-555-0199 for bonus approvals under Project Titan.`
  },
  {
    label: 'Safe Code Snippet',
    text: `Write a React functional component that renders a responsive navbar with Tailwind CSS and dark mode support.`
  }
];

const RedactionShieldPage = () => {
  const [promptInput, setPromptInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isSendingAI, setIsSendingAI] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e?.preventDefault();
    if (!promptInput.trim()) {
      setError('Please enter or paste a prompt to analyze');
      return;
    }

    setError('');
    setIsScanning(true);
    setScanResult(null);
    setAiResult(null);

    try {
      const data = await scanPromptRedaction(promptInput);
      setScanResult({
        originalPrompt: promptInput,
        maskedPrompt: data.maskedPrompt,
        entities: data.entities || [],
        aiResponseMasked: data.aiResponseMasked,
        aiResponseUnmasked: data.aiResponseUnmasked
      });

      // Save to real user scan history
      saveScanRecord({
        type: 'redaction',
        summary: promptInput.length > 60 ? `${promptInput.substring(0, 60)}...` : promptInput,
        fullContent: promptInput,
        maskedContent: data.maskedPrompt,
        entitiesFound: data.entities?.length || 0,
        entities: data.entities || [],
        riskLevel: data.entities?.length > 0 ? 'medium' : 'low'
      });
    } catch (err) {
      setError('Failed to process redaction scan. Please try again.');
      console.error('Redaction error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSendToAI = async () => {
    if (!scanResult) return;
    setIsSendingAI(true);
    try {
      const data = await sendMaskedPromptToAI(scanResult.maskedPrompt);
      setAiResult({
        aiResponseMasked: data.aiResponseMasked || scanResult.aiResponseMasked,
        aiResponseUnmasked: scanResult.aiResponseUnmasked
      });
    } catch (err) {
      console.error('AI gateway error:', err);
      // Fallback
      setAiResult({
        aiResponseMasked: scanResult.aiResponseMasked,
        aiResponseUnmasked: scanResult.aiResponseUnmasked
      });
    } finally {
      setIsSendingAI(false);
    }
  };

  const handleLoadSample = (text) => {
    setPromptInput(text);
    setError('');
    setScanResult(null);
    setAiResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-6">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center shadow-glow-teal">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                Prompt Redaction Shield
                <AiBadge label="Zero PII Leakage" />
              </h1>
              <p className="text-xs text-slate-400">
                Pillar 1: Automatic inline detection and masking of API keys, PII, credentials & project codenames.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase">Test Prompts:</span>
          {SAMPLE_PROMPTS.map((sample, i) => (
            <button
              key={i}
              onClick={() => handleLoadSample(sample.text)}
              className="px-2.5 py-1 rounded-lg bg-[#121723] hover:bg-[#182030] text-teal-300 text-xs font-mono border border-teal-500/30 transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleScan} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Paste Prompt Intended for AI (ChatGPT / Gemini / Claude)
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {promptInput.length} characters
              </span>
            </div>
            <textarea
              rows={5}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Paste your prompt code snippet, database query, or internal memo here..."
              className="w-full p-4 bg-[#0a0d14] border border-[#1e2638] focus:border-teal-500/80 rounded-2xl text-slate-100 font-mono text-sm focus:outline-none transition-colors leading-relaxed shadow-inner"
            />
          </div>

          <div className="flex justify-end space-x-3">
            {promptInput && (
              <button
                type="button"
                onClick={() => {
                  setPromptInput('');
                  setScanResult(null);
                  setAiResult(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#121723] text-slate-300 hover:bg-[#182030] text-xs font-mono border border-[#1e2638] transition-colors"
              >
                Clear Input
              </button>
            )}
            <button
              type="submit"
              disabled={isScanning || !promptInput.trim()}
              className="px-6 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors shadow-glow-teal flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing & Masking Entities...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 fill-slate-950" />
                  <span>Scan & Redact Sensitive Data</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results View */}
      {scanResult && (
        <RedactionResultCard
          scanResult={scanResult}
          onSendToAI={handleSendToAI}
          isSendingAI={isSendingAI}
          aiResult={aiResult}
        />
      )}

    </div>
  );
};

export default RedactionShieldPage;
