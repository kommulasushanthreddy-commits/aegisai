import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, RefreshCw, Send, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { analyzePhishingMessage } from '../api/phishing';
import RiskGauge from '../components/phishing/RiskGauge';
import FlagExplanationList from '../components/phishing/FlagExplanationList';

const SAMPLE_EMAILS = [
  {
    label: 'Urgent Password Reset Phish',
    sender: 'security-alert@auth-verify-corp.net',
    subject: 'URGENT: Your Corporate Account Will Be Suspended Within 24 Hours',
    message: `Dear User, We detected unauthorized login attempts on your account. You must verify your credentials immediately at http://login-update-password-check.bit.ly/auth or your access will be suspended within 24 hours. Regards, IT Security Team.`
  },
  {
    label: 'Executive Impersonation',
    sender: 'ceo.office.acme@gmail.com',
    subject: 'Confidential Request - Wire Transfer',
    message: `Hi Sarah, I am in an urgent meeting with clients and need you to execute a wire transfer of $14,500 to our partner supplier right away. Do not call me as I cannot answer. Send the receipt once complete.`
  },
  {
    label: 'Safe Partner Email',
    sender: 'newsletter@aws-events.com',
    subject: 'Invitation: Cloud Architecture Summit 2026',
    message: `Join us for the annual Cloud Architecture Summit next month. Register on our official event portal to reserve your breakout session seats.`
  }
];

const PhishingAnalyzerPage = () => {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!message.trim()) {
      setError('Please paste the email or message body to analyze');
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

  const handleLoadSample = (sample) => {
    setSender(sample.sender);
    setSubject(sample.subject);
    setMessage(sample.message);
    setError('');
    setAnalysisResult(null);
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
              Pillar 2: Explainable threat scoring with evidence red flags and risk recommendations.
            </p>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase">Test Samples:</span>
          {SAMPLE_EMAILS.map((sample, i) => (
            <button
              key={i}
              onClick={() => handleLoadSample(sample)}
              className="px-2.5 py-1 rounded-lg bg-[#121723] hover:bg-[#182030] text-amber-300 text-xs font-mono border border-amber-500/30 transition-colors"
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

        <form onSubmit={handleAnalyze} className="p-6 bg-[#121723] rounded-3xl border border-[#1e2638] space-y-4 shadow-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Sender Email / Header (Optional)
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="support@verify-auth-domain.net"
                className="w-full px-3.5 py-2 bg-[#0a0d14] border border-[#1e2638] focus:border-amber-500/80 rounded-xl text-slate-200 text-sm font-mono focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Subject Line (Optional)
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="URGENT: Action Required"
                className="w-full px-3.5 py-2 bg-[#0a0d14] border border-[#1e2638] focus:border-amber-500/80 rounded-xl text-slate-200 text-sm font-mono focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Suspicious Message Body *
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste suspicious email text, SMS message, or chat snippet here..."
              className="w-full p-4 bg-[#0a0d14] border border-[#1e2638] focus:border-amber-500/80 rounded-xl text-slate-100 font-mono text-sm focus:outline-none transition-colors leading-relaxed shadow-inner"
            />
          </div>

          <div className="flex justify-end space-x-3">
            {message && (
              <button
                type="button"
                onClick={() => {
                  setSender('');
                  setSubject('');
                  setMessage('');
                  setAnalysisResult(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0a0d14] text-slate-300 hover:bg-[#182030] text-xs font-mono border border-[#1e2638] transition-colors"
              >
                Clear Form
              </button>
            )}
            <button
              type="submit"
              disabled={isAnalyzing || !message.trim()}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-glow-amber flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Evaluating Social Engineering Risk...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 fill-slate-950" />
                  <span>Analyze Message Threats</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Analysis Results View */}
      {analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Risk Gauge */}
          <div className="lg:col-span-1">
            <RiskGauge score={analysisResult.riskScore} level={analysisResult.riskLevel} />
          </div>

          {/* Right Column: Explainable Red Flags & Recommendation */}
          <div className="lg:col-span-2 p-6 bg-[#121723] rounded-3xl border border-[#1e2638] shadow-xl">
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
