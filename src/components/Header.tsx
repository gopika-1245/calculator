import React from 'react';
import { Calculator, History, Sparkles, Keyboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { AngleMode, CalculatorMode, ThemeMode } from '../types/calculator';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
  angleMode: AngleMode;
  onAngleModeChange: (angleMode: AngleMode) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  historyCount: number;
  isHistoryOpen: boolean;
  onToggleHistory: () => void;
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  angleMode,
  onAngleModeChange,
  theme,
  onToggleTheme,
  historyCount,
  isHistoryOpen,
  onToggleHistory,
  onOpenShortcuts,
}) => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-white/10 dark:border-white/10 light:border-slate-200">
      {/* Brand */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center gap-2.5">
          <div className="relative p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
            <Calculator className="w-5 h-5" />
            <Sparkles className="w-2.5 h-2.5 absolute -top-1 -right-1 text-amber-300" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white dark:text-white light:text-slate-900 flex items-center gap-1.5">
              SmartCalc
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                PRO
              </span>
            </h1>
          </div>
        </div>

        {/* Mobile quick actions */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={onToggleHistory}
            className={`relative p-2.5 rounded-xl border transition-colors ${
              isHistoryOpen
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'border-white/10 dark:border-white/10 light:border-slate-300 bg-white/5 dark:bg-white/5 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10'
            }`}
            aria-label="Toggle history panel"
          >
            <History className="w-4 h-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-orange-500 text-white flex items-center justify-center">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mode Selectors & Controls */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
        {/* Standard vs Scientific Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-black/20 dark:bg-black/30 light:bg-slate-200/80 border border-white/5 dark:border-white/5 light:border-slate-300">
          <button
            onClick={() => onModeChange('standard')}
            className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'standard'
                ? 'text-white'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            {mode === 'standard' && (
              <motion.div
                layoutId="activeModeTab"
                className="absolute inset-0 bg-blue-600 rounded-lg shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
              />
            )}
            <span className="relative z-10">Standard</span>
          </button>

          <button
            onClick={() => onModeChange('scientific')}
            className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'scientific'
                ? 'text-white'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            {mode === 'scientific' && (
              <motion.div
                layoutId="activeModeTab"
                className="absolute inset-0 bg-blue-600 rounded-lg shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
              />
            )}
            <span className="relative z-10">Scientific</span>
          </button>
        </div>

        {/* DEG / RAD Switch (Only in Scientific Mode) */}
        {mode === 'scientific' && (
          <div className="inline-flex p-1 rounded-xl bg-black/20 dark:bg-black/30 light:bg-slate-200/80 border border-white/5 dark:border-white/5 light:border-slate-300">
            <button
              onClick={() => onAngleModeChange('DEG')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                angleMode === 'DEG'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DEG
            </button>
            <button
              onClick={() => onAngleModeChange('RAD')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                angleMode === 'RAD'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              RAD
            </button>
          </div>
        )}

        {/* Desktop Controls: Shortcuts, History, Theme */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onOpenShortcuts}
            className="p-2.5 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-300 bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-colors"
            title="Keyboard Shortcuts"
            aria-label="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleHistory}
            className={`relative p-2.5 rounded-xl border transition-colors ${
              isHistoryOpen
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'border-white/10 dark:border-white/10 light:border-slate-300 bg-white/5 dark:bg-white/5 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/10'
            }`}
            title="Calculation History"
            aria-label="Calculation History"
          >
            <History className="w-4 h-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-orange-500 text-white flex items-center justify-center">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
