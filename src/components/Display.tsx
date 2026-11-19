import React, { useRef, useEffect } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { AngleMode, CalculatorMode } from '../types/calculator';
import { formatNumberForDisplay } from '../utils/formatters';

interface DisplayProps {
  expression: string;
  result: string | null;
  liveResult: string | null;
  error: string | null;
  isEvaluated: boolean;
  copied: boolean;
  mode: CalculatorMode;
  angleMode: AngleMode;
  onCopy: () => void;
}

export const Display: React.FC<DisplayProps> = ({
  expression,
  result,
  liveResult,
  error,
  isEvaluated,
  copied,
  mode,
  angleMode,
  onCopy,
}) => {
  const exprEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll expression to the end as user types
  useEffect(() => {
    if (exprEndRef.current) {
      exprEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
    }
  }, [expression]);

  // Determine main display content
  const displayText = error
    ? error
    : isEvaluated && result
    ? formatNumberForDisplay(result)
    : expression
    ? expression
    : '0';

  // Calculate dynamic text size based on length
  const getTextSizeClass = (text: string) => {
    if (text.length > 20) return 'text-xl sm:text-2xl';
    if (text.length > 14) return 'text-2xl sm:text-3xl';
    if (text.length > 9) return 'text-3xl sm:text-4xl';
    return 'text-4xl sm:text-5xl';
  };

  return (
    <div className="relative flex flex-col justify-end p-4 sm:p-5 rounded-2xl bg-black/40 dark:bg-black/40 light:bg-slate-100/90 border border-white/10 dark:border-white/10 light:border-slate-300 shadow-inner min-h-[140px] sm:min-h-[160px] overflow-hidden group">
      {/* Top row: Mode badges & Copy action */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-md bg-white/5 dark:bg-white/5 light:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 border border-white/5 dark:border-white/5 light:border-slate-300">
            {mode === 'scientific' ? `SCI • ${angleMode}` : 'STD'}
          </span>
        </div>

        {/* Copy button */}
        {(result || expression || liveResult) && !error && (
          <button
            onClick={onCopy}
            className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 border border-white/5'
            }`}
            title="Copy result to clipboard"
            aria-label="Copy result"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Expression Tape (history/active expression) */}
      <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap text-right text-sm sm:text-base font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 py-1">
        <span className="w-full text-right select-text">
          {isEvaluated && expression ? expression : expression || ''}
        </span>
        <div ref={exprEndRef} />
      </div>

      {/* Live Preview (while typing expression before pressing =) */}
      {liveResult && !isEvaluated && !error && (
        <div className="text-right text-sm font-mono text-blue-400 dark:text-blue-400 light:text-blue-600 py-0.5">
          = {formatNumberForDisplay(liveResult)}
        </div>
      )}

      {/* Main Big Result / Value / Error */}
      <div
        className={`w-full text-right font-mono font-semibold tracking-tight break-all select-text transition-all duration-150 ${getTextSizeClass(
          displayText
        )} ${
          error
            ? 'text-rose-400 flex items-center justify-end gap-2 text-xl sm:text-2xl font-sans'
            : isEvaluated
            ? 'text-white dark:text-white light:text-slate-900'
            : 'text-slate-200 dark:text-slate-200 light:text-slate-800'
        }`}
      >
        {error && <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />}
        <span>{displayText}</span>
      </div>
    </div>
  );
};
