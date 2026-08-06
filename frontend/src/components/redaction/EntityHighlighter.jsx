import React from 'react';

/**
 * Renders original prompt text with highlighted inline entity spans
 */
const EntityHighlighter = ({ text, entities = [] }) => {
  if (!text) return null;
  if (!entities || entities.length === 0) {
    return <div className="whitespace-pre-wrap font-mono text-sm text-slate-300">{text}</div>;
  }

  // Sort entities by start position
  const sorted = [...entities].sort((a, b) => a.span[0] - b.span[0]);
  const parts = [];
  let lastIndex = 0;

  const entityColorMap = {
    EMAIL: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    API_KEY: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    PERSON: 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-glow-teal',
    INTERNAL_ORG: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    SSN_CREDENTIAL: 'bg-red-600/30 text-red-300 border-red-500/50',
    PHONE: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  };

  sorted.forEach((entity, idx) => {
    const [start, end] = entity.span;

    // Push text preceding the entity
    if (start > lastIndex) {
      parts.push(
        <span key={`text-${idx}`}>{text.substring(lastIndex, start)}</span>
      );
    }

    // Push entity span with highlight
    const colorClass = entityColorMap[entity.type] || 'bg-teal-500/20 text-teal-300 border-teal-500/40';
    parts.push(
      <mark
        key={`entity-${idx}`}
        className={`px-1.5 py-0.5 mx-0.5 rounded border text-xs font-mono font-semibold transition-all inline-flex items-center gap-1 ${colorClass}`}
        title={`Detected Entity: ${entity.type}`}
      >
        <span>{text.substring(start, end)}</span>
        <span className="text-[10px] opacity-75 font-sans uppercase">[{entity.type}]</span>
      </mark>
    );

    lastIndex = end;
  });

  // Remaining trailing text
  if (lastIndex < text.length) {
    parts.push(<span key="text-last">{text.substring(lastIndex)}</span>);
  }

  return (
    <div className="whitespace-pre-wrap font-mono text-sm text-slate-200 leading-relaxed bg-[#0a0d14] p-4 rounded-xl border border-[#1e2638]">
      {parts}
    </div>
  );
};

export default EntityHighlighter;
