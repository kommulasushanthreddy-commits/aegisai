import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, RefreshCw, Send, AlertCircle, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { analyzePhishingMessage } from '../api/phishing';
import RiskGauge from '../components/phishing/RiskGauge';
import FlagExplanationList from '../components/phishing/FlagExplanationList';

const SAMPLE_EMAILS = [
  {
    label: '🚨 Phishing Email',
    type: 'danger',
    sender: 'security-team@verify-auth-domain.net',
    subject: 'URGENT: Action Required — Your Account Will Be Suspended Within 30 Minutes',
    message: `Dear User,

URGENT: We have detected multiple unauthorized login attempts on your corporate account. Failure to complete verification will result in permanent loss of access.

Please reset your password and verify your credentials immediately by clicking the link below:
https://verify-auth-domain.net/reset-password

If you do not act within 30 minutes, your account will be deactivated.

— IT Security Operations Team`
  },
  {
    label: '✅ Normal Email',
    type: 'safe',
    sender: 'newsletter@aws-events.com',
    subject: 'Invitation: Cloud Architecture Summit 2026',
    message: `Hi team,

We are excited to invite you to the annual Cloud Architecture Summit next month. Sessions will cover serverless architecture, cost optimization, and security best practices.

Please register on our official event portal to reserve your seat.

Best regards,
Events Team`
  },
  {
    label: '📋 Empty (Validation Test)',
    type: 'empty',
    sender: '',
    subject: '',
    message: ''
  }
];

const PhishingAnalyzerPage = () => {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(null);

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!message.trim()) {
      setError('Please enter email content to analyze.');
      return;
    }

    setError('');
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const data = await analyzePhishingMessage({ message, sender, subject });
      setAnalysisResult(data);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error('Phishing analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (sample, idx) => {
    setSender(sample.sender);
    setSubject(sample.subject);
    setMessage(sample.message);
    setError('');
    setAnalysisResult(null);
    setActiveTab(idx);

    // Auto-trigger validation message for empty sample
    if (sample.type === 'empty') {
      setError('Please enter email content to analyze.');
    }
  };

  const handleClear = () => {
    setSender('');
    setSubject('');
    setMessage('');
    setAnalysisResult(null);
    setError('');
    setActiveTab(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2638] pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Phishing & Social-Engineering Analyzer</h1>
            <p className="text-xs text-slate-400">
              Pillar 2: Multi-vector threat scoring with evidence red flags and risk recommendations.
            </p>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase">Test Samples:</span>
          {SAMPLE_EMAILS.map((sample, i) => (
            <button
              key={i}
              onClick={() => handleLoadSample(sample, i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                activeTab === i
                  ? sample.type === 'danger'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                    : sample.type === 'safe'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                    : 'bg-slate-500/20 text-slate-300 border-slate-500/50'
                  : 'bg-[#121723] hover:bg-[#182030] text-amber-300 border-amber-500/30'
              }`}
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4">

        {/* Validation / Error Banner */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAnalyze} className="p-6 bg-[#121723] rounded-3xl border border-[#1e2638] space-y-4 shadow-xl">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 min-w-0">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Sender Email / Header (Optional)
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="support@verify-auth-domain.net"
                className="w-full px-3.5 py-2 bg-[#0a0d14] border border-[#1e2638] focus:border-amber-500/80 rounded-xl text-slate-200 text-sm font-mono focus:outline-none transition-colors truncate"
              />
            </div>

            <div className="space-y-1 min-w-0">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Subject Line (Optional)
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="URGENT: Action Required"
                className="w-full px-3.5 py-2 bg-[#0a0d14] border border-[#1e2638] focus:border-amber-500/80 rounded-xl text-slate-200 text-sm font-mono focus:outline-none transition-colors truncate"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Suspicious Message Body <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (e.target.value.trim() && error) setError('');
              }}
              placeholder="Paste suspicious email text, SMS message, or chat snippet here..."
              className={`w-full p-4 bg-[#0a0d14] border focus:outline-none rounded-xl text-slate-100 font-mono text-sm transition-colors leading-relaxed shadow-inner resize-y ${
                error ? 'border-rose-500/50 focus:border-rose-500/80' : 'border-[#1e2638] focus:border-amber-500/80'
              }`}
            />
            {!message.trim() && (
              <p className="text-xs text-slate-500 font-mono pl-1">Required — paste email content to enable analysis.</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            {(message || sender || subject) && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 rounded-xl bg-[#0a0d14] text-slate-400 hover:text-slate-200 hover:bg-[#182030] text-xs font-mono border border-[#1e2638] transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              type="submit"
              disabled={isAnalyzing || !message.trim()}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-glow-amber flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Evaluating Social Engineering Risk...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4" />
                  <span>Analyze Message Threats</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left Column: Risk Gauge */}
          <div className="lg:col-span-2">
            <RiskGauge score={analysisResult.riskScore} level={analysisResult.riskLevel} />
          </div>

          {/* Right Column: Flags & Recommendation */}
          <div className="lg:col-span-3 p-6 bg-[#121723] rounded-3xl border border-[#1e2638] shadow-xl overflow-hidden">
            <FlagExplanationList
              flags={analysisResult.flags}
              recommendation={analysisResult.recommendation}
              riskLevel={analysisResult.riskLevel}
            />
          </div>

        </div>
      )}

    </div>
  );
};

export default PhishingAnalyzerPage;
