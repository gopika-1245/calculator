import { all, create } from 'mathjs';
import { AngleMode, CalculationResult } from '../types/calculator';

// Initialize a sandboxed mathjs instance
const math = create(all, {});

// Limit configuration to prevent prototype pollution or unintended behavior
math.config({
  number: 'number',
  precision: 64,
});

/**
 * Creates custom scope with trigonometry and log functions adjusted for the selected angle mode.
 */
function getEvaluationScope(angleMode: AngleMode) {
  const isDeg = angleMode === 'DEG';

  return {
    pi: Math.PI,
    e: Math.E,

    // Trigonometry functions
    sin: (x: number): number => {
      if (isDeg) {
        const normalized = ((x % 360) + 360) % 360;
        if (normalized === 0 || normalized === 180 || normalized === 360) return 0;
        if (normalized === 90) return 1;
        if (normalized === 270) return -1;
        if (normalized === 30 || normalized === 150) return 0.5;
        if (normalized === 210 || normalized === 330) return -0.5;
        return Math.sin((x * Math.PI) / 180);
      }
      return Math.sin(x);
    },

    cos: (x: number): number => {
      if (isDeg) {
        const normalized = ((x % 360) + 360) % 360;
        if (normalized === 90 || normalized === 270) return 0;
        if (normalized === 0 || normalized === 360) return 1;
        if (normalized === 180) return -1;
        if (normalized === 60 || normalized === 300) return 0.5;
        if (normalized === 120 || normalized === 240) return -0.5;
        return Math.cos((x * Math.PI) / 180);
      }
      return Math.cos(x);
    },

    tan: (x: number): number => {
      if (isDeg) {
        const normalized = ((x % 180) + 180) % 180;
        if (normalized === 90) {
          throw new Error('Tangent is undefined for 90°');
        }
        if (normalized === 0 || normalized === 180) return 0;
        if (normalized === 45) return 1;
        if (normalized === 135) return -1;
        return Math.tan((x * Math.PI) / 180);
      }
      // Check radian asymptote ~ (2k+1)*pi/2
      const piOver2 = Math.PI / 2;
      const mod = Math.abs(x % Math.PI);
      if (Math.abs(mod - piOver2) < 1e-14) {
        throw new Error('Tangent is undefined at π/2 + kπ');
      }
      return Math.tan(x);
    },

    // Inverse Trigonometry functions
    asin: (x: number): number => {
      if (x < -1 || x > 1) {
        throw new Error('Domain error for asin: input must be in [-1, 1]');
      }
      const rad = Math.asin(x);
      return isDeg ? (rad * 180) / Math.PI : rad;
    },

    acos: (x: number): number => {
      if (x < -1 || x > 1) {
        throw new Error('Domain error for acos: input must be in [-1, 1]');
      }
      const rad = Math.acos(x);
      return isDeg ? (rad * 180) / Math.PI : rad;
    },

    atan: (x: number): number => {
      const rad = Math.atan(x);
      return isDeg ? (rad * 180) / Math.PI : rad;
    },

    // Logarithms
    log: (x: number): number => {
      if (x <= 0) {
        throw new Error('Logarithm of non-positive number is undefined');
      }
      return Math.log10(x);
    },

    ln: (x: number): number => {
      if (x <= 0) {
        throw new Error('Natural logarithm of non-positive number is undefined');
      }
      return Math.log(x);
    },

    // Square root
    sqrt: (x: number): number => {
      if (x < 0) {
        throw new Error('Square root of negative number is not real');
      }
      return Math.sqrt(x);
    },

    // Absolute value
    abs: (x: number): number => Math.abs(x),

    // Factorial
    factorial: (x: number): number => {
      if (x < 0 || !Number.isInteger(x)) {
        throw new Error('Factorial requires non-negative integer');
      }
      if (x > 170) {
        throw new Error('Overflow: Factorial too large');
      }
      let res = 1;
      for (let i = 2; i <= x; i++) {
        res *= i;
      }
      return res;
    },
  };
}

/**
 * Sanitizes and prepares the raw user expression into a valid mathjs expression.
 */
export function sanitizeExpression(expression: string): string {
  if (!expression || !expression.trim()) {
    return '';
  }

  let expr = expression.trim();

  // Replace visual operators with standard operators
  expr = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi');

  // Handle square root symbols: √64 -> sqrt(64), √(64) -> sqrt(64)
  expr = expr.replace(/√\s*(\d+(?:\.\d+)?)/g, 'sqrt($1)');
  expr = expr.replace(/√\s*\(/g, 'sqrt(');
  expr = expr.replace(/√/g, 'sqrt(');
  expr = expr.replace(/sqrt\s*(\d+(?:\.\d+)?)/g, 'sqrt($1)');

  // Handle implicit multiplication:
  // e.g. 5pi -> 5*pi, 5(2) -> 5*(2), (2)(3) -> (2)*(3), 5sqrt -> 5*sqrt
  expr = expr.replace(/(\d)(\s*)(pi|e|sqrt|sin|cos|tan|asin|acos|atan|log|ln|abs|\()/g, '$1*$3');
  expr = expr.replace(/(\))(\s*)(\d|pi|e|sqrt|sin|cos|tan|asin|acos|atan|log|ln|abs|\()/g, '$1*$3');

  // Handle percentages: convert patterns like `number%` to `(number * 0.01)`
  // E.g. `100 * 25%` -> `100 * (25 * 0.01)`
  expr = expr.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1 * 0.01)');

  // Auto-close any unclosed parentheses at the end of expression
  let openCount = 0;
  for (const char of expr) {
    if (char === '(') openCount++;
    if (char === ')') openCount--;
  }
  while (openCount > 0) {
    expr += ')';
    openCount--;
  }

  return expr;
}

/**
 * Formats a raw numeric calculation result to avoid floating-point display inaccuracies
 * like 0.1 + 0.2 = 0.30000000000000004 while maintaining precision.
 */
export function formatNumericResult(num: number): string {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) {
    return num > 0 ? 'Infinity' : '-Infinity';
  }

  // Check for very close to integer (floating precision correction)
  const roundedInt = Math.round(num);
  if (Math.abs(num - roundedInt) < 1e-12) {
    return roundedInt.toString();
  }

  // Format with precision
  let formatted = Number(num.toPrecision(12)).toString();

  // If in scientific notation with small exponent, expand it if reasonable
  if (formatted.includes('e')) {
    const absVal = Math.abs(num);
    if (absVal >= 1e-6 && absVal < 1e12) {
      formatted = num.toLocaleString('en-US', {
        useGrouping: false,
        maximumFractionDigits: 10,
      });
    }
  }

  return formatted;
}

/**
 * Main evaluation function. Uses sandboxed mathjs without any eval() or new Function().
 */
export function evaluateExpression(
  expression: string,
  angleMode: AngleMode = 'DEG'
): CalculationResult {
  const sanitized = sanitizeExpression(expression);

  if (!sanitized) {
    return { success: false, error: 'Empty expression' };
  }

  // Check for trailing hanging operators that would make expression incomplete
  if (/[+\-*/^]$/.test(sanitized)) {
    return { success: false, error: 'Incomplete expression' };
  }

  try {
    const scope = getEvaluationScope(angleMode);
    
    // Evaluate in sandboxed scope
    const rawResult = math.evaluate(sanitized, scope);

    // Validation of result
    if (rawResult === null || rawResult === undefined) {
      return { success: false, error: 'Invalid expression' };
    }

    if (typeof rawResult === 'function') {
      return { success: false, error: 'Incomplete function' };
    }

    // Handle mathjs units / matrices if any
    let numVal: number;
    if (typeof rawResult === 'number') {
      numVal = rawResult;
    } else if (typeof rawResult?.toNumber === 'function') {
      numVal = rawResult.toNumber();
    } else if (typeof rawResult === 'boolean') {
      return { success: false, error: 'Unexpected boolean result' };
    } else {
      numVal = Number(rawResult);
    }

    if (isNaN(numVal)) {
      return { success: false, error: 'Invalid expression' };
    }

    if (!isFinite(numVal)) {
      return { success: false, error: 'Cannot divide by zero' };
    }

    const formatted = formatNumericResult(numVal);

    return {
      success: true,
      result: formatted,
      numericResult: numVal,
    };
  } catch (err: any) {
    const message = err?.message || 'Error';
    if (
      message.toLowerCase().includes('divide by zero') ||
      message.toLowerCase().includes('division by zero')
    ) {
      return { success: false, error: 'Cannot divide by zero' };
    }
    if (
      message.toLowerCase().includes('domain') ||
      message.toLowerCase().includes('undefined') ||
      message.toLowerCase().includes('non-positive') ||
      message.toLowerCase().includes('not real')
    ) {
      return { success: false, error: message };
    }
    return { success: false, error: 'Invalid expression' };
  }
}
