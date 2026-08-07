import React, { useState } from 'react';
import { User, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Modal from './Modal';

const DisplayNameModal = ({ isOpen, onClose }) => {
  const { user, updateDisplayName } = useAuth();
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    updateDisplayName(nameInput);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Set Your Display Name">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center space-y-2 pb-2 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0099FF] mx-auto flex items-center justify-center text-slate-950 font-bold shadow-glow-cyan">
            <Shield className="w-6 h-6 fill-slate-950 stroke-slate-950" />
          </div>
          <h3 className="text-lg font-black text-slate-100 font-sans">What should we call you?</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Please enter your preferred full name or nickname to display on your security profile, dashboard, and audit trail.
          </p>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Display Name Updated!</span>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
            Preferred Display Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Sushanth Reddy"
              className="w-full pl-10 pr-4 py-2.5 bg-[#09090B] border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-[#00D4FF]"
              autoFocus
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>Save & Continue</span>
        </button>
      </form>
    </Modal>
  );
};

export default DisplayNameModal;
