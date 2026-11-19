import React from 'react';
import { motion } from 'framer-motion';
import { Delete, Plus, Minus, X, Divide, Equal, Percent } from 'lucide-react';

interface KeypadProps {
  onInputDigit: (digit: string) => void;
  onInputDecimal: () => void;
  onInputOperator: (op: string) => void;
  onClear: () => void;
  onDeleteChar: () => void;
  onToggleSign: () => void;
  onCalculate: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  onInputDigit,
  onInputDecimal,
  onInputOperator,
  onClear,
  onDeleteChar,
  onToggleSign,
  onCalculate,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
      {/* Row 1: AC, DEL, %, ÷ */}
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onClear}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-rose-500/50 bg-rose-500/15 hover:bg-rose-500/25 dark:bg-rose-500/15 dark:hover:bg-rose-500/25 light:bg-rose-100 light:hover:bg-rose-200 text-rose-400 dark:text-rose-400 light:text-rose-600 border border-rose-500/20 shadow-sm"
        aria-label="Clear all"
      >
        AC
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onDeleteChar}
        className="h-14 sm:h-16 rounded-2xl font-semibold flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500/50 bg-slate-800/60 hover:bg-slate-700/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 light:bg-slate-200/80 light:hover:bg-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-white/5 dark:border-white/5 light:border-slate-300 shadow-sm"
        aria-label="Delete last character"
      >
        <Delete className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputOperator('%')}
        className="h-14 sm:h-16 rounded-2xl font-semibold flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500/50 bg-slate-800/60 hover:bg-slate-700/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 light:bg-slate-200/80 light:hover:bg-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-white/5 dark:border-white/5 light:border-slate-300 shadow-sm"
        aria-label="Percentage"
      >
        <Percent className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputOperator('÷')}
        className="h-14 sm:h-16 rounded-2xl font-bold flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-orange-500/15 hover:bg-orange-500/25 dark:bg-orange-500/15 dark:hover:bg-orange-500/25 light:bg-orange-100 light:hover:bg-orange-200 text-orange-400 dark:text-orange-400 light:text-orange-600 border border-orange-500/30 shadow-sm"
        aria-label="Divide"
      >
        <Divide className="w-5 h-5" />
      </motion.button>

      {/* Row 2: 7, 8, 9, × */}
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('7')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="7"
      >
        7
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('8')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="8"
      >
        8
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('9')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="9"
      >
        9
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputOperator('×')}
        className="h-14 sm:h-16 rounded-2xl font-bold flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-orange-500/15 hover:bg-orange-500/25 dark:bg-orange-500/15 dark:hover:bg-orange-500/25 light:bg-orange-100 light:hover:bg-orange-200 text-orange-400 dark:text-orange-400 light:text-orange-600 border border-orange-500/30 shadow-sm"
        aria-label="Multiply"
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Row 3: 4, 5, 6, − */}
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('4')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="4"
      >
        4
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('5')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="5"
      >
        5
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('6')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="6"
      >
        6
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputOperator('−')}
        className="h-14 sm:h-16 rounded-2xl font-bold flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-orange-500/15 hover:bg-orange-500/25 dark:bg-orange-500/15 dark:hover:bg-orange-500/25 light:bg-orange-100 light:hover:bg-orange-200 text-orange-400 dark:text-orange-400 light:text-orange-600 border border-orange-500/30 shadow-sm"
        aria-label="Subtract"
      >
        <Minus className="w-5 h-5" />
      </motion.button>

      {/* Row 4: 1, 2, 3, + */}
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('1')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="1"
      >
        1
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('2')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="2"
      >
        2
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('3')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="3"
      >
        3
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputOperator('+')}
        className="h-14 sm:h-16 rounded-2xl font-bold flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-orange-500/15 hover:bg-orange-500/25 dark:bg-orange-500/15 dark:hover:bg-orange-500/25 light:bg-orange-100 light:hover:bg-orange-200 text-orange-400 dark:text-orange-400 light:text-orange-600 border border-orange-500/30 shadow-sm"
        aria-label="Add"
      >
        <Plus className="w-5 h-5" />
      </motion.button>

      {/* Row 5: +/-, 0, ., = */}
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onToggleSign}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500/50 bg-slate-800/60 hover:bg-slate-700/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 light:bg-slate-200/80 light:hover:bg-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-white/5 dark:border-white/5 light:border-slate-300 shadow-sm"
        aria-label="Positive / Negative toggle"
      >
        ⁺/₋
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onInputDigit('0')}
        className="h-14 sm:h-16 rounded-2xl font-semibold text-lg sm:text-xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="0"
      >
        0
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onInputDecimal}
        className="h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl font-mono transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500/50 bg-slate-800/40 hover:bg-slate-700/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 light:bg-white light:hover:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
        aria-label="Decimal point"
      >
        .
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onCalculate}
        className="h-14 sm:h-16 rounded-2xl font-bold flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30"
        aria-label="Calculate equals"
      >
        <Equal className="w-6 h-6" />
      </motion.button>
    </div>
  );
};
