import { useEffect } from 'react';

interface KeyboardProps {
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  inputOperator: (op: string) => void;
  inputParenthesis: (paren: '(' | ')') => void;
  inputFactorial: () => void;
  clear: () => void;
  deleteChar: () => void;
  calculate: () => void;
  copyResult: () => void;
  toggleSign: () => void;
}

export function useKeyboard({
  inputDigit,
  inputDecimal,
  inputOperator,
  inputParenthesis,
  inputFactorial,
  clear,
  deleteChar,
  calculate,
  toggleSign,
}: KeyboardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Allow default browser actions for key combos like Ctrl+C, Ctrl+V, Ctrl+A, F12, etc.
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key;

      // Digits 0-9
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        inputDigit(key);
        return;
      }

      // Decimal point
      if (key === '.' || key === ',') {
        e.preventDefault();
        inputDecimal();
        return;
      }

      // Arithmetic Operators
      if (key === '+') {
        e.preventDefault();
        inputOperator('+');
        return;
      }

      if (key === '-') {
        e.preventDefault();
        inputOperator('−');
        return;
      }

      if (key === '*' || key.toLowerCase() === 'x') {
        e.preventDefault();
        inputOperator('×');
        return;
      }

      if (key === '/') {
        e.preventDefault(); // Prevent Firefox quick search
        inputOperator('÷');
        return;
      }

      if (key === '%') {
        e.preventDefault();
        inputOperator('%');
        return;
      }

      if (key === '^') {
        e.preventDefault();
        inputOperator('^');
        return;
      }

      if (key === '!') {
        e.preventDefault();
        inputFactorial();
        return;
      }

      // Parentheses
      if (key === '(') {
        e.preventDefault();
        inputParenthesis('(');
        return;
      }

      if (key === ')') {
        e.preventDefault();
        inputParenthesis(')');
        return;
      }

      // Enter or equals
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
        return;
      }

      // Backspace
      if (key === 'Backspace') {
        e.preventDefault();
        deleteChar();
        return;
      }

      // Escape (Clear All)
      if (key === 'Escape') {
        e.preventDefault();
        clear();
        return;
      }

      // Negation toggle (F9 or n or N or _)
      if (key === '_' || key === 'F9') {
        e.preventDefault();
        toggleSign();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    inputDigit,
    inputDecimal,
    inputOperator,
    inputParenthesis,
    inputFactorial,
    clear,
    deleteChar,
    calculate,
    toggleSign,
  ]);
}
