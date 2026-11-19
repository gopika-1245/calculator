import { useState, useEffect, useCallback, useMemo } from 'react';
import { AngleMode, CalculatorMode, HistoryItem } from '../types/calculator';
import { evaluateExpression } from '../utils/calculatorEngine';
import { copyToClipboard } from '../utils/formatters';

const HISTORY_STORAGE_KEY = 'smartcalc_history_v1';
const ANGLE_STORAGE_KEY = 'smartcalc_angle_v1';
const MODE_STORAGE_KEY = 'smartcalc_mode_v1';

export function useCalculator() {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Mode: standard or scientific
  const [mode, setModeState] = useState<CalculatorMode>(() => {
    try {
      const saved = localStorage.getItem(MODE_STORAGE_KEY);
      if (saved === 'standard' || saved === 'scientific') return saved;
    } catch {}
    return 'standard';
  });

  // Angle mode: DEG or RAD
  const [angleMode, setAngleModeState] = useState<AngleMode>(() => {
    try {
      const saved = localStorage.getItem(ANGLE_STORAGE_KEY);
      if (saved === 'DEG' || saved === 'RAD') return saved;
    } catch {}
    return 'DEG';
  });

  // Calculation History
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // History panel open state (desktop sidebar or mobile sheet)
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history to localStorage:', e);
    }
  }, [history]);

  // Persist mode
  const setMode = useCallback((newMode: CalculatorMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(MODE_STORAGE_KEY, newMode);
    } catch {}
  }, []);

  // Persist angleMode
  const setAngleMode = useCallback((newAngleMode: AngleMode) => {
    setAngleModeState(newAngleMode);
    try {
      localStorage.setItem(ANGLE_STORAGE_KEY, newAngleMode);
    } catch {}
  }, []);

  // Compute live result as user types (when expression is incomplete or being typed)
  const liveResult = useMemo(() => {
    if (!expression || isEvaluated || error) return null;
    // Don't calculate live if it's just a single number
    if (/^-?\d+(\.\d+)?$/.test(expression.trim())) return null;

    // Check if ends with operator
    if (/[+\-×÷^]$/.test(expression.trim())) return null;

    const res = evaluateExpression(expression, angleMode);
    if (res.success && res.result && res.result !== expression) {
      return res.result;
    }
    return null;
  }, [expression, isEvaluated, error, angleMode]);

  // Helper to extract the last number token from expression
  const getLastNumberToken = useCallback((expr: string) => {
    const match = expr.match(/(\(-?\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)$/);
    return match ? match[0] : null;
  }, []);

  // Clear all (AC)
  const clear = useCallback(() => {
    setExpression('');
    setResult(null);
    setError(null);
    setIsEvaluated(false);
  }, []);

  // Delete last character / token (DEL)
  const deleteChar = useCallback(() => {
    setError(null);

    if (isEvaluated) {
      clear();
      return;
    }

    setExpression((prev) => {
      if (!prev) return '';

      // Check if ends with multi-character function like "asin(", "sin(", "sqrt(", "log(", "ln(", "abs("
      const functionTokens = [
        'asin(',
        'acos(',
        'atan(',
        'sin(',
        'cos(',
        'tan(',
        'sqrt(',
        'log(',
        'ln(',
        'abs(',
      ];

      for (const fn of functionTokens) {
        if (prev.endsWith(fn)) {
          return prev.slice(0, -fn.length);
        }
      }

      // Check for operators with spaces e.g. " + ", " − ", " × ", " ÷ "
      if (prev.endsWith(' ')) {
        return prev.trimEnd().slice(0, -1).trimEnd();
      }

      return prev.slice(0, -1);
    });
  }, [isEvaluated, clear]);

  // Input a digit (0-9)
  const inputDigit = useCallback(
    (digit: string) => {
      setError(null);

      if (isEvaluated) {
        setExpression(digit);
        setResult(null);
        setIsEvaluated(false);
        return;
      }

      setExpression((prev) => {
        // Prevent leading zeros e.g. "00"
        if (prev === '0' && digit !== '.') {
          return digit;
        }
        return prev + digit;
      });
    },
    [isEvaluated]
  );

  // Input a decimal point (.)
  const inputDecimal = useCallback(() => {
    setError(null);

    if (isEvaluated) {
      setExpression('0.');
      setResult(null);
      setIsEvaluated(false);
      return;
    }

    setExpression((prev) => {
      if (!prev) return '0.';

      // Get last number segment
      const tokens = prev.split(/[\s+\-×÷^()]+/);
      const lastToken = tokens[tokens.length - 1];

      // If last token already has a decimal, ignore
      if (lastToken.includes('.')) {
        return prev;
      }

      // If previous char is an operator or paren, prepend 0
      if (/[+\-×÷^(]$/.test(prev.trim())) {
        return prev + '0.';
      }

      return prev + '.';
    });
  }, [isEvaluated]);

  // Input an operator (+, −, ×, ÷, ^, %)
  const inputOperator = useCallback(
    (op: string) => {
      setError(null);

      // Map minus to visual minus
      const visualOp = op === '-' || op === '−' ? '−' : op;

      if (isEvaluated && result) {
        setExpression(`${result} ${visualOp} `);
        setResult(null);
        setIsEvaluated(false);
        return;
      }

      setExpression((prev) => {
        if (!prev) {
          // If expression is empty and minus is entered, allow negative sign
          if (visualOp === '−') return '−';
          return `0 ${visualOp} `;
        }

        const trimmed = prev.trim();
        // If last character is already an operator, replace it
        if (/[+\-−×÷^]$/.test(trimmed)) {
          return trimmed.slice(0, -1).trim() + ` ${visualOp} `;
        }

        return `${trimmed} ${visualOp} `;
      });
    },
    [isEvaluated, result]
  );

  // Input a scientific function: sin(, cos(, sqrt(, etc.
  const inputFunction = useCallback(
    (fn: string) => {
      setError(null);

      if (isEvaluated) {
        setExpression(fn);
        setResult(null);
        setIsEvaluated(false);
        return;
      }

      setExpression((prev) => {
        if (!prev) return fn;
        // If ends with a digit or closing paren, add implicit multiplication
        if (/[\d)πe]$/.test(prev.trim())) {
          return `${prev.trim()} × ${fn}`;
        }
        return prev + fn;
      });
    },
    [isEvaluated]
  );

  // Input constant (π, e)
  const inputConstant = useCallback(
    (constant: 'π' | 'e') => {
      setError(null);

      if (isEvaluated) {
        setExpression(constant);
        setResult(null);
        setIsEvaluated(false);
        return;
      }

      setExpression((prev) => {
        if (!prev) return constant;
        if (/[\d)πe]$/.test(prev.trim())) {
          return `${prev.trim()} × ${constant}`;
        }
        return prev + constant;
      });
    },
    [isEvaluated]
  );

  // Input parentheses
  const inputParenthesis = useCallback(
    (paren: '(' | ')') => {
      setError(null);

      if (isEvaluated) {
        if (paren === '(') {
          setExpression('(');
          setResult(null);
          setIsEvaluated(false);
          return;
        }
      }

      setExpression((prev) => {
        if (paren === '(') {
          if (!prev) return '(';
          if (/[\d)πe]$/.test(prev.trim())) {
            return `${prev.trim()} × (`;
          }
          return prev + '(';
        } else {
          // Check if there is an unmatched open parenthesis to close
          const openCount = (prev.match(/\(/g) || []).length;
          const closeCount = (prev.match(/\)/g) || []).length;
          if (openCount > closeCount) {
            return prev + ')';
          }
          return prev;
        }
      });
    },
    [isEvaluated]
  );

  // Factorial (!)
  const inputFactorial = useCallback(() => {
    setError(null);
    if (isEvaluated && result) {
      setExpression(`${result}!`);
      setResult(null);
      setIsEvaluated(false);
      return;
    }
    setExpression((prev) => {
      if (!prev || /[+\-−×÷^(]$/.test(prev.trim())) return prev;
      return prev + '!';
    });
  }, [isEvaluated, result]);

  // Square (x²)
  const inputSquare = useCallback(() => {
    setError(null);
    if (isEvaluated && result) {
      setExpression(`${result}^2`);
      setResult(null);
      setIsEvaluated(false);
      return;
    }
    setExpression((prev) => {
      if (!prev || /[+\-−×÷^(]$/.test(prev.trim())) return prev;
      return prev + '^2';
    });
  }, [isEvaluated, result]);

  // Reciprocal (1/x)
  const inputReciprocal = useCallback(() => {
    setError(null);
    if (isEvaluated && result) {
      setExpression(`1 / (${result})`);
      setResult(null);
      setIsEvaluated(false);
      return;
    }
    setExpression((prev) => {
      const lastNum = getLastNumberToken(prev);
      if (lastNum) {
        const withoutLast = prev.slice(0, prev.length - lastNum.length);
        return `${withoutLast}1 / (${lastNum})`;
      }
      return prev ? `1 / (${prev})` : '1 / (';
    });
  }, [isEvaluated, result, getLastNumberToken]);

  // Positive/negative toggle (+/-)
  const toggleSign = useCallback(() => {
    setError(null);

    if (isEvaluated && result) {
      const num = Number(result);
      if (!isNaN(num)) {
        const toggled = (-num).toString();
        setExpression(toggled);
        setResult(toggled);
        return;
      }
    }

    setExpression((prev) => {
      if (!prev) return '−';

      // Find the last number token e.g. "45" or "(-45)"
      const lastParenthesizedNeg = prev.match(/\(−(\d+(?:\.\d+)?)\)$/);
      if (lastParenthesizedNeg) {
        return prev.slice(0, -lastParenthesizedNeg[0].length) + lastParenthesizedNeg[1];
      }

      const match = prev.match(/(\d+(?:\.\d+)?)$/);
      if (match) {
        const num = match[1];
        const prefix = prev.slice(0, -num.length);
        return `${prefix}(−${num})`;
      }

      if (prev.endsWith('−')) {
        return prev.slice(0, -1);
      }

      return prev;
    });
  }, [isEvaluated, result]);

  // Calculate (=)
  const calculate = useCallback(() => {
    if (!expression || expression.trim() === '') return;

    const res = evaluateExpression(expression, angleMode);

    if (res.success && res.result !== undefined) {
      setResult(res.result);
      setError(null);
      setIsEvaluated(true);

      // Create new history item
      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        expression: expression.trim(),
        result: res.result,
        timestamp: Date.now(),
        angleMode,
      };

      setHistory((prev) => [newItem, ...prev.slice(0, 49)]); // Keep last 50
    } else {
      setError(res.error || 'Invalid expression');
      setResult(null);
    }
  }, [expression, angleMode]);

  // Load a calculation from history
  const loadHistoryItem = useCallback((item: HistoryItem) => {
    setExpression(item.expression);
    setResult(item.result);
    setError(null);
    setIsEvaluated(true);
    if (item.angleMode) {
      setAngleModeState(item.angleMode);
    }
  }, []);

  // Delete an individual history item
  const deleteHistoryItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Copy result to clipboard
  const handleCopyResult = useCallback(async () => {
    const textToCopy = result || liveResult || expression;
    if (!textToCopy) return;

    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result, liveResult, expression]);

  return {
    expression,
    setExpression,
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
    copyResult: handleCopyResult,
  };
}
