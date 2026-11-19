import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeMode } from '../types/calculator';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative p-2.5 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-300 bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: [0.8, 1] }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? (
          <Moon className="w-4 h-4 text-blue-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
};
