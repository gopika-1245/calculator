import { describe, it, expect } from 'vitest';
import { evaluateExpression, sanitizeExpression } from '../utils/calculatorEngine';

describe('Calculator Engine Core Requirements', () => {
  // 1. 10 + 20 = 30
  it('1. performs addition: 10 + 20 = 30', () => {
    const res = evaluateExpression('10 + 20');
    expect(res.success).toBe(true);
    expect(res.result).toBe('30');
  });

  // 2. 50 - 15 = 35
  it('2. performs subtraction: 50 - 15 = 35', () => {
    const res = evaluateExpression('50 - 15');
    expect(res.success).toBe(true);
    expect(res.result).toBe('35');
  });

  // 3. 12 × 5 = 60
  it('3. performs multiplication: 12 × 5 = 60', () => {
    const res = evaluateExpression('12 × 5');
    expect(res.success).toBe(true);
    expect(res.result).toBe('60');
  });

  // 4. 100 ÷ 4 = 25
  it('4. performs division: 100 ÷ 4 = 25', () => {
    const res = evaluateExpression('100 ÷ 4');
    expect(res.success).toBe(true);
    expect(res.result).toBe('25');
  });

  // 5. 5 + 3 × 2 = 11 (Operator precedence / BODMAS)
  it('5. maintains correct operator precedence: 5 + 3 × 2 = 11', () => {
    const res = evaluateExpression('5 + 3 × 2');
    expect(res.success).toBe(true);
    expect(res.result).toBe('11');
  });

  // 6. √64 = 8
  it('6. calculates square root: √64 = 8', () => {
    const res = evaluateExpression('√64');
    expect(res.success).toBe(true);
    expect(res.result).toBe('8');

    const res2 = evaluateExpression('√(64)');
    expect(res2.success).toBe(true);
    expect(res2.result).toBe('8');
  });

  // 7. 5² = 25
  it('7. calculates square: 5^2 = 25', () => {
    const res = evaluateExpression('5^2');
    expect(res.success).toBe(true);
    expect(res.result).toBe('25');
  });

  // 8. log(100) = 2
  it('8. calculates base-10 log: log(100) = 2', () => {
    const res = evaluateExpression('log(100)');
    expect(res.success).toBe(true);
    expect(res.result).toBe('2');
  });

  // 9. sin(30°) = 0.5
  it('9. calculates sin in DEG mode: sin(30°) = 0.5', () => {
    const res = evaluateExpression('sin(30)', 'DEG');
    expect(res.success).toBe(true);
    expect(res.result).toBe('0.5');
  });

  // 10. 5! = 120
  it('10. calculates factorial: 5! = 120', () => {
    const res = evaluateExpression('5!');
    expect(res.success).toBe(true);
    expect(res.result).toBe('120');
  });
});

describe('Scientific Functions & Edge Cases', () => {
  it('handles division by zero safely', () => {
    const res = evaluateExpression('100 ÷ 0');
    expect(res.success).toBe(false);
    expect(res.error).toBe('Cannot divide by zero');
  });

  it('handles floating point imprecision: 0.1 + 0.2 = 0.3', () => {
    const res = evaluateExpression('0.1 + 0.2');
    expect(res.success).toBe(true);
    expect(res.result).toBe('0.3');
  });

  it('handles invalid expressions without crashing', () => {
    const res = evaluateExpression('++');
    expect(res.success).toBe(false);

    const res2 = evaluateExpression('5 + * 2');
    expect(res2.success).toBe(false);
  });

  it('evaluates cosine and tangent in DEG mode', () => {
    const cos60 = evaluateExpression('cos(60)', 'DEG');
    expect(cos60.success).toBe(true);
    expect(cos60.result).toBe('0.5');

    const cos90 = evaluateExpression('cos(90)', 'DEG');
    expect(cos90.success).toBe(true);
    expect(cos90.result).toBe('0');

    const tan45 = evaluateExpression('tan(45)', 'DEG');
    expect(tan45.success).toBe(true);
    expect(tan45.result).toBe('1');
  });

  it('handles RAD mode for trigonometry', () => {
    const res = evaluateExpression('sin(pi / 6)', 'RAD');
    expect(res.success).toBe(true);
    expect(Number(res.result)).toBeCloseTo(0.5, 5);
  });

  it('calculates natural log: ln(e) = 1', () => {
    const res = evaluateExpression('ln(e)');
    expect(res.success).toBe(true);
    expect(res.result).toBe('1');
  });

  it('handles percentages: 50 × 10% = 5', () => {
    const res = evaluateExpression('50 × 10%');
    expect(res.success).toBe(true);
    expect(res.result).toBe('5');
  });

  it('calculates reciprocal: 1 / 4 = 0.25', () => {
    const res = evaluateExpression('1 / 4');
    expect(res.success).toBe(true);
    expect(res.result).toBe('0.25');
  });

  it('calculates absolute value: abs(-42) = 42', () => {
    const res = evaluateExpression('abs(-42)');
    expect(res.success).toBe(true);
    expect(res.result).toBe('42');
  });

  it('handles chained operations: (5 + 3) × (10 - 2) = 64', () => {
    const res = evaluateExpression('(5 + 3) × (10 - 2)');
    expect(res.success).toBe(true);
    expect(res.result).toBe('64');
  });

  it('sanitizes implicit multiplication correctly', () => {
    expect(sanitizeExpression('2pi')).toBe('2*pi');
    expect(sanitizeExpression('5(2)')).toBe('5*(2)');
    expect(sanitizeExpression('4sqrt(9)')).toBe('4*sqrt(9)');
  });
});
