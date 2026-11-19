import React, { useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { useKeyboard } from '../hooks/useKeyboard';
import { useTheme } from '../hooks/useTheme';
import { Header } from './Header';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { ScientificPanel } from './ScientificPanel';
import { History } from './History';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';

export const Calculator: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const {
    expression,
    result,
    liveResult,
    error,
    isEvaluated,
    copied,
    mode,
    setMode,
    angleMode,
    setAngleMode,
    history,
    isHistoryOpen,
    setIsHistoryOpen,
    clear,
    deleteChar,
    inputDigit,
    inputDecimal,
    inputOperator,
    inputFunction,
    inputConstant,
    inputParenthesis,
    inputFactorial,
    inputSquare,
    inputReciprocal,
    toggleSign,
    calculate,
    loadHistoryItem,
    deleteHistoryItem,
    clearHistory,
    copyResult,
  } = useCalculator();

  // Attach global keyboard shortcuts
  useKeyboard({
    inputDigit,
    inputDecimal,
    inputOperator,
    inputParenthesis,
    inputFactorial,
    clear,
    deleteChar,
    calculate,
    copyResult,
    toggleSign,
  });

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-3 sm:p-6 lg:p-8">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/10 light:bg-blue-400/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/10 light:bg-indigo-400/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Layout Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
        {/* Calculator Main Box */}
        <div
          className={`w-full transition-all duration-300 ${
            mode === 'scientific' ? 'max-w-lg' : 'max-w-md'
          } rounded-3xl glass-panel p-4 sm:p-6 shadow-2xl flex flex-col gap-4 border border-white/10 dark:border-white/10 light:border-slate-300`}
        >
          {/* Header */}
          <Header
            mode={mode}
            onModeChange={setMode}
            angleMode={angleMode}
            onAngleModeChange={setAngleMode}
            theme={theme}
            onToggleTheme={toggleTheme}
            historyCount={history.length}
            isHistoryOpen={isHistoryOpen}
            onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
            onOpenShortcuts={() => setIsShortcutsOpen(true)}
          />

          {/* Display */}
          <Display
            expression={expression}
            result={result}
            liveResult={liveResult}
            error={error}
            isEvaluated={isEvaluated}
            copied={copied}
            mode={mode}
            angleMode={angleMode}
            onCopy={copyResult}
          />

          {/* Scientific Keypad (conditionally shown or toggled) */}
          {mode === 'scientific' && (
            <ScientificPanel
              onInputFunction={inputFunction}
              onInputConstant={inputConstant}
              onInputParenthesis={inputParenthesis}
              onInputFactorial={inputFactorial}
              onInputSquare={inputSquare}
              onInputReciprocal={inputReciprocal}
              onInputOperator={inputOperator}
            />
          )}

          {/* Standard Keypad */}
          <Keypad
            onInputDigit={inputDigit}
            onInputDecimal={inputDecimal}
            onInputOperator={inputOperator}
            onClear={clear}
            onDeleteChar={deleteChar}
            onToggleSign={toggleSign}
            onCalculate={calculate}
          />

          {/* Footer Note */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
            <span>Powered by mathjs</span>
            <span className="hidden sm:inline">Press Esc to clear • Enter to calculate</span>
          </div>
        </div>

        {/* History Panel: Responsive Drawer/Sidebar */}
        <div
          className={`${
            isHistoryOpen
              ? 'fixed inset-4 z-40 lg:relative lg:inset-auto lg:z-auto flex max-w-sm w-full h-[90vh] lg:h-[580px]'
              : 'hidden'
          }`}
        >
          <History
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            history={history}
            onSelect={loadHistoryItem}
            onDelete={deleteHistoryItem}
            onClear={clearHistory}
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
};
