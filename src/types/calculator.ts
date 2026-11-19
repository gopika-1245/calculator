export type CalculatorMode = 'standard' | 'scientific';

export type AngleMode = 'DEG' | 'RAD';

export type ThemeMode = 'dark' | 'light';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  angleMode?: AngleMode;
}

export type KeyType = 
  | 'number' 
  | 'operator' 
  | 'action' 
  | 'function' 
  | 'constant' 
  | 'equals' 
  | 'clear';

export interface KeypadButton {
  label: string;
  value: string;
  type: KeyType;
  action?: string;
  ariaLabel?: string;
  subLabel?: string;
  highlight?: boolean;
  scientificOnly?: boolean;
  className?: string;
}

export interface CalculationResult {
  success: boolean;
  result?: string;
  numericResult?: number;
  error?: string;
}
