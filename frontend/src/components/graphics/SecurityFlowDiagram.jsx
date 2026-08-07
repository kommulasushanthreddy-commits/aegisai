import React, { useState } from 'react';
import { User, Shield, Cpu, Lock, ArrowRight, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';

const SecurityFlowDiagram = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: '1. User Input',
      desc: 'Employee enters prompt containing API keys, PII, or internal passwords.',
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
      badge: 'Unfiltered Payload'
    },
    {
      step: 2,
      title: '2. Shield AI Gateway',
      desc: 'Multi-pass regex & NLP detects sensitive entities and replaces with safe tokens.',
      color: 'border-teal-500/50 bg-teal-500/10 text-teal-300 shadow-glow-teal',
      badge: 'Zero-Trust Intercept'
    },
    {
      step: 3,
      title: '3. LLM Processing',
      desc: 'Public AI model (ChatGPT/Gemini) processes prompt with zero PII exposure.',
      color: 'border-purple-500/50 bg-purple-500/10 text-purple-300',
      badge: 'Safe AI Response'
    },
    {
      step: 4,
      title: '4. Session Unmask',
      desc: 'Gateway securely reassembles placeholders for authorized submitter session only.',
      color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
      badge: 'Client Reassembly'
    }
  ];

  return (
    <div className="p-8 rounded-3xl bg-[#121723] border border-[#1e2638] space-y-8 shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping"></span>
            <h3 className="text-xl font-bold text-slate-100">Live Shield AI Security Gateway Architecture</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual pipeline demonstrating inline prompt interception before data leaves the corporate perimeter.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Graphic</span>
        </div>
      </div>

      {/* SVG Pipeline Visualization */}
      <div className="relative py-4">
        
        {/* Connecting Line Graphic */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/40 via-teal-500/60 to-emerald-500/40 -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          
          {/* Node 1: Employee */}
          <div
            onClick={() => setActiveStep(1)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 space-y-3 ${
              activeStep === 1
                ? 'bg-[#182030] border-amber-500 shadow-glow-amber scale-105'
                : 'bg-[#0a0d14] border-[#1e2638] hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase">
                Input
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">1. Employee Prompt</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Contains API keys (<code className="text-amber-400 font-mono text-[11px]">sk-proj...</code>), emails, and PII.
              </p>
            </div>
          </div>

          {/* Node 2: AegisAI Engine */}
          <div
            onClick={() => setActiveStep(2)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 space-y-3 ${
              activeStep === 2
                ? 'bg-[#182030] border-teal-400 shadow-glow-teal scale-105'
                : 'bg-[#0a0d14] border-teal-500/30 hover:border-teal-400/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold animate-pulse">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 uppercase font-bold">
                Redact
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1">
                2. Redaction Shield
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Replaces sensitive tokens with <code className="text-teal-300 font-mono text-[11px]">[REDACTED_...]</code>.
              </p>
            </div>
          </div>

          {/* Node 3: LLM Model */}
          <div
            onClick={() => setActiveStep(3)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 space-y-3 ${
              activeStep === 3
                ? 'bg-[#182030] border-purple-500 shadow-glow-teal scale-105'
                : 'bg-[#0a0d14] border-[#1e2638] hover:border-purple-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">
                AI Service
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">3. External LLM</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                OpenAI/Gemini model processes sanitized prompt with zero leaks.
              </p>
            </div>
          </div>

          {/* Node 4: Unmasked Response */}
          <div
            onClick={() => setActiveStep(4)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 space-y-3 ${
              activeStep === 4
                ? 'bg-[#182030] border-emerald-500 shadow-glow-teal scale-105'
                : 'bg-[#0a0d14] border-[#1e2638] hover:border-emerald-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                Secure
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">4. Local Unmask</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Response context reassembled in browser session only.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Detail Inspector Card */}
      <div className={`p-4 rounded-2xl border font-mono text-xs ${steps[activeStep - 1].color}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold uppercase tracking-wider">{steps[activeStep - 1].title}</span>
          <span className="px-2 py-0.5 rounded bg-slate-900/50 text-[10px] uppercase font-bold">
            {steps[activeStep - 1].badge}
          </span>
        </div>
        <p className="text-slate-200 text-xs leading-relaxed">
          {steps[activeStep - 1].desc}
        </p>
      </div>

    </div>
  );
};

export default SecurityFlowDiagram;
