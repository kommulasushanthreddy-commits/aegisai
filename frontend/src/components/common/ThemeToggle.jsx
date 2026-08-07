import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-slate-100 border border-slate-700/50 transition-all flex items-center gap-1.5 text-xs font-mono"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
