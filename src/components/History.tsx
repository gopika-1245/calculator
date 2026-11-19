import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, Trash2, X, Clock, ArrowUpRight } from 'lucide-react';
import { HistoryItem } from '../types/calculator';
import { formatNumberForDisplay, formatTimestamp } from '../utils/formatters';

interface HistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export const History: React.FC<HistoryProps> = ({
  isOpen,
  onClose,
  history,
  onSelect,
  onDelete,
  onClear,
}) => {
  const [confirmClear, setConfirmClear] = useState<boolean>(false);

  const handleClear = () => {
    if (confirmClear) {
      onClear();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full lg:w-80 flex flex-col h-full rounded-3xl glass-panel p-4 shadow-xl border border-white/10 dark:border-white/10 light:border-slate-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/10 light:border-slate-200">
            <div className="flex items-center gap-2">
              <HistoryIcon className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold tracking-tight text-white dark:text-white light:text-slate-900">
                History
              </h2>
              {history.length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono">
                  {history.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {history.length > 0 && (
                <button
                  onClick={handleClear}
                  className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                    confirmClear
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                  }`}
                  title="Clear all history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{confirmClear ? 'Confirm?' : 'Clear'}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close history"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                <div className="p-3 rounded-2xl bg-white/5 text-slate-500 mb-2">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-400 dark:text-slate-400 light:text-slate-600">
                  No calculations yet
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-500 mt-1">
                  Perform calculations and your history will be safely saved here.
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="group relative p-3 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 hover:bg-white/[0.07] dark:hover:bg-white/[0.07] light:hover:bg-slate-200 border border-white/5 dark:border-white/5 light:border-slate-200 transition-all cursor-pointer"
                  onClick={() => onSelect(item)}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mb-1">
                    <span className="flex items-center gap-1 text-[11px] font-sans">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {formatTimestamp(item.timestamp)}
                    </span>
                    {item.angleMode && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 dark:bg-white/5 light:bg-slate-300">
                        {item.angleMode}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-600 truncate mb-1">
                    {item.expression} =
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-base font-mono font-bold text-white dark:text-white light:text-slate-900 truncate">
                      {formatNumberForDisplay(item.result)}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(item);
                        }}
                        className="p-1 rounded-md text-blue-400 hover:bg-blue-500/20"
                        title="Use in calculator"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/20"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
