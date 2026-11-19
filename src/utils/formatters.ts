/**
 * Formats numbers and expressions for display in the calculator
 */

/**
 * Formats a raw number string or number into a locale-friendly string with thousands separators.
 * Handles scientific notation, decimals, and negative numbers.
 */
export function formatNumberForDisplay(numStr: string): string {
  if (!numStr || numStr === 'Error' || isNaN(Number(numStr))) {
    return numStr;
  }

  // Handle scientific notation e.g. 1.23e+15 or 1.23e-8
  if (numStr.includes('e') || numStr.includes('E')) {
    const [mantissa, exponent] = numStr.toLowerCase().split('e');
    const formattedMantissa = formatDecimalNumber(mantissa);
    return `${formattedMantissa}e${exponent}`;
  }

  return formatDecimalNumber(numStr);
}

function formatDecimalNumber(numStr: string): string {
  const parts = numStr.split('.');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? parts[1] : undefined;

  // Format integer part with commas (preserving negative sign)
  const isNegative = integerPart.startsWith('-');
  const cleanInt = isNegative ? integerPart.slice(1) : integerPart;
  
  const formattedInt = cleanInt.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const signedInt = isNegative ? `-${formattedInt}` : formattedInt;

  if (decimalPart !== undefined) {
    return `${signedInt}.${decimalPart}`;
  }
  return signedInt;
}

/**
 * Formats an expression for beautiful display, replacing internal function names
 * and operators with clean math symbols.
 */
export function formatExpressionDisplay(expr: string): string {
  if (!expr) return '';

  return expr
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/-/g, ' − ')
    .replace(/sqrt\(/g, '√(')
    .replace(/log10\(/g, 'log(')
    .replace(/\^/g, '^')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Formats relative time for history display
 */
export function formatTimestamp(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

/**
 * Copies text to clipboard safely
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}
