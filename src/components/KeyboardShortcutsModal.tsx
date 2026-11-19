import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { key: '0 – 9', description: 'Enter numbers' },
  { key: '+ , - , * , /', description: 'Basic arithmetic operators (+, −, ×, ÷)' },
  { key: '. or ,', description: 'Decimal point' },
  { key: 'Enter or =', description: 'Evaluate expression' },
  { key: 'Backspace', description: 'Delete last character (DEL)' },
  { key: 'Escape', description: 'Clear all (AC)' },
  { key: '( , )', description: 'Parentheses' },
  { key: '%', description: 'Percentage' },
  { key: '^', description: 'Power exponent (xʸ)' },
  { key: '!', description: 'Factorial (x!)' },
  { key: '_ or F9', description: 'Toggle positive / negative sign (+/−)' },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md rounded-2xl bg-slate-900 dark:bg-slate-900 border border-white/10 dark:border-white/10 p-6 shadow-2xl text-slate-100"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Keyboard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close shortcuts modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2.5 pr-1">
              {shortcuts.map((sc) => (
                <div
                  key={sc.key}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/[0.05]"
                >
                  <span className="text-sm text-slate-300">{sc.description}</span>
                  <kbd className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-slate-800 border border-slate-700 text-blue-400 shadow-sm">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
