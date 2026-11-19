import React from 'react';
import { motion } from 'framer-motion';

interface ScientificPanelProps {
  onInputFunction: (fn: string) => void;
  onInputConstant: (constant: 'π' | 'e') => void;
  onInputParenthesis: (paren: '(' | ')') => void;
  onInputFactorial: () => void;
  onInputSquare: () => void;
  onInputReciprocal: () => void;
  onInputOperator: (op: string) => void;
}

export const ScientificPanel: React.FC<ScientificPanelProps> = ({
  onInputFunction,
  onInputConstant,
  onInputParenthesis,
  onInputFactorial,
  onInputSquare,
  onInputReciprocal,
  onInputOperator,
}) => {
  const sciButtons = [
    // Row 1
    { label: 'sin', action: () => onInputFunction('sin('), sub: 'sine' },
    { label: 'cos', action: () => onInputFunction('cos('), sub: 'cosine' },
    { label: 'tan', action: () => onInputFunction('tan('), sub: 'tangent' },
    { label: 'log', action: () => onInputFunction('log('), sub: 'log₁₀' },
    { label: 'ln', action: () => onInputFunction('ln('), sub: 'logₑ' },

    // Row 2
    { label: 'sin⁻¹', action: () => onInputFunction('asin('), sub: 'arcsin' },
    { label: 'cos⁻¹', action: () => onInputFunction('acos('), sub: 'arccos' },
    { label: 'tan⁻¹', action: () => onInputFunction('atan('), sub: 'arctan' },
    { label: '√', action: () => onInputFunction('sqrt('), sub: 'sqrt' },
    { label: 'x²', action: onInputSquare, sub: 'square' },

    // Row 3
    { label: 'xʸ', action: () => onInputOperator('^'), sub: 'power' },
    { label: '1/x', action: onInputReciprocal, sub: 'reciprocal' },
    { label: '|x|', action: () => onInputFunction('abs('), sub: 'absolute' },
    { label: 'x!', action: onInputFactorial, sub: 'factorial' },
    { label: 'π', action: () => onInputConstant('π'), sub: 'pi' },

    // Row 4
    { label: '(', action: () => onInputParenthesis('('), sub: 'open' },
    { label: ')', action: () => onInputParenthesis(')'), sub: 'close' },
    { label: 'e', action: () => onInputConstant('e'), sub: 'euler' },
    { label: '10ˣ', action: () => onInputOperator('10^'), sub: '10^x' },
    { label: 'eˣ', action: () => onInputFunction('e^'), sub: 'e^x' },
  ];

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-2 p-1.5 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-slate-200/50 border border-white/[0.06] dark:border-white/[0.06] light:border-slate-300">
      {sciButtons.map((btn) => (
        <motion.button
          key={btn.label}
          whileTap={{ scale: 0.94 }}
          onClick={btn.action}
          className="group relative flex flex-col items-center justify-center py-2 sm:py-2.5 px-1 rounded-xl text-xs sm:text-sm font-semibold tracking-tight transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-slate-800/60 hover:bg-slate-700/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 light:bg-white light:hover:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-white/5 dark:border-white/5 light:border-slate-200 shadow-sm"
          aria-label={btn.sub || btn.label}
        >
          <span className="font-mono">{btn.label}</span>
          <span className="text-[9px] text-slate-500 group-hover:text-slate-400 font-sans hidden sm:block">
            {btn.sub}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
