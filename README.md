# 🧮 SmartCalc Pro — Premium Smart Calculator Web Application

A modern, high-performance, aesthetically crafted Smart Calculator built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **mathjs**. Features both **Standard** and **Scientific** calculation modes, complete calculation history with LocalStorage persistence, instant live previews, dark/light themes, keyboard navigation, and full mobile responsiveness.

Ready for zero-config one-click deployment on **Vercel** and **GitHub**.

---

## ✨ Features

### 1. Dual Calculation Modes
- **Standard Calculator**:
  - Addition (`+`), Subtraction (`−`), Multiplication (`×`), Division (`÷`)
  - Percentage calculations (`%`)
  - Sign inversion toggle (`⁺/₋`)
  - Clear all (`AC`) and character delete (`DEL`)
  - Continuous chained calculations and BODMAS/PEMDAS operator precedence
  - Safe division-by-zero handling with user-friendly alerts

- **Scientific Calculator**:
  - **Trigonometry**: `sin`, `cos`, `tan`, `asin` (`sin⁻¹`), `acos` (`cos⁻¹`), `atan` (`tan⁻¹`)
  - **Angle Mode**: Smooth **DEG** (degrees) and **RAD** (radians) switching
  - **Logarithms**: `log` (base-10 logarithm) and `ln` (natural logarithm)
  - **Powers & Roots**: Square root (`√`), Square (`x²`), Arbitrary Power (`xʸ`), Exponential (`10ˣ`, `eˣ`)
  - **Algebra & Constants**: Factorial (`x!`), Reciprocal (`1/x`), Absolute value (`|x|`), `π` (Pi), `e` (Euler's number), Parentheses `(` and `)`

### 2. Live Evaluation & Precision Engine
- **Instant Live Preview**: Shows live evaluated results in real time as expressions are typed.
- **Floating-Point Accuracy**: Normalized decimal precision to eliminate floating-point artifacts (e.g. `0.1 + 0.2 = 0.3`).
- **Mathematical Safety**: Sandboxed parsing with `mathjs` — **zero** `eval()` or `new Function()`.
- **Large Number Handling**: Dynamic typography scaling and locale-aware number formatting.

### 3. Calculation History
- Dedicated history drawer and desktop sidebar.
- Persisted automatically to browser `LocalStorage`.
- Click any entry to recall expressions and results back into the calculator.
- Individual entry deletion and one-click history clearing with confirmation.

### 4. Full Keyboard Interaction
- Digits `0`–`9` and decimal point (`.` or `,`)
- Operators: `+`, `-`, `*` or `x`, `/`, `%`, `^`, `!`
- Parentheses: `(` and `)`
- Calculate: `Enter` or `=`
- Delete / Backspace: `Backspace`
- Clear All: `Escape`
- Sign Toggle: `_` or `F9`
- Built-in visual Keyboard Shortcuts modal.

### 5. UI/UX & Themes
- Apple-inspired minimalism and SaaS glassmorphism.
- Default deep obsidian dark theme with ambient glow backdrops.
- Crisp modern light theme with high-contrast accessibility.
- Micro-interactions and tap feedback powered by `framer-motion`.
- One-click copy result to clipboard with visual toast indicator.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core** | React 18, TypeScript, Vite 5 |
| **Styling** | Tailwind CSS 3, Custom Glassmorphism CSS |
| **Math Engine** | `mathjs` |
| **Icons & Animation** | `lucide-react`, `framer-motion` |
| **Testing** | `vitest` |
| **Storage** | Browser `LocalStorage` |
| **Deployment** | Vercel, GitHub |

---

## 📁 Project Structure

```
calculator/
├── .github/
├── dist/                          # Production build output
├── public/
├── src/
│   ├── components/
│   │   ├── Calculator.tsx         # Main container layout
│   │   ├── Display.tsx            # Expression, result, and live preview
│   │   ├── Header.tsx             # Brand, mode toggle, theme & shortcuts
│   │   ├── History.tsx            # Persisted calculation history panel
│   │   ├── Keypad.tsx             # Standard 4x5 tactile keypad
│   │   ├── ScientificPanel.tsx    # Scientific function keypad grid
│   │   ├── ThemeToggle.tsx        # Dark/light animated toggle
│   │   └── KeyboardShortcutsModal.tsx # Shortcuts cheatsheet modal
│   ├── hooks/
│   │   ├── useCalculator.ts       # State machine and operation handlers
│   │   ├── useKeyboard.ts         # Global keyboard listener & key mapping
│   │   └── useTheme.ts            # LocalStorage-backed theme switcher
│   ├── utils/
│   │   ├── calculatorEngine.ts    # mathjs engine, DEG/RAD, sanitization
│   │   └── formatters.ts          # Display numbers, commas, timestamps
│   ├── types/
│   │   └── calculator.ts          # TypeScript interfaces & types
│   ├── tests/
│   │   └── calculatorEngine.test.ts # Vitest suite covering all operations
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # React DOM entry
│   └── index.css                  # Tailwind directives & glassmorphic styles
├── index.html                     # HTML template with Google Fonts
├── package.json                   # Dependencies & scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind theme & color tokens
├── tsconfig.json                  # TypeScript compiler options
├── vercel.json                    # Vercel SPA configuration & cache headers
└── vite.config.ts                 # Vite bundle optimization & chunk splitting
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gopika-1245/calculator.git
   cd calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Run unit tests:**
   ```bash
   npm test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🧪 Mathematical Verification & Testing Suite

All standard and scientific operations have been verified with automated unit tests using **Vitest**:

| # | Operation | Expression | Expected Result | Status |
|---|---|---|---|---|
| 1 | Addition | `10 + 20` | `30` | ✅ Passed |
| 2 | Subtraction | `50 - 15` | `35` | ✅ Passed |
| 3 | Multiplication | `12 × 5` | `60` | ✅ Passed |
| 4 | Division | `100 ÷ 4` | `25` | ✅ Passed |
| 5 | Operator Precedence (BODMAS) | `5 + 3 × 2` | `11` | ✅ Passed |
| 6 | Square Root | `√64` | `8` | ✅ Passed |
| 7 | Square | `5²` | `25` | ✅ Passed |
| 8 | Base-10 Logarithm | `log(100)` | `2` | ✅ Passed |
| 9 | Sine (DEG Mode) | `sin(30°)` | `0.5` | ✅ Passed |
| 10 | Factorial | `5!` | `120` | ✅ Passed |
| 11 | Division by Zero | `100 ÷ 0` | `Cannot divide by zero` | ✅ Passed |
| 12 | Float Precision | `0.1 + 0.2` | `0.3` | ✅ Passed |
| 13 | Cosine (DEG Mode) | `cos(60°)` | `0.5` | ✅ Passed |
| 14 | Tangent (DEG Mode) | `tan(45°)` | `1` | ✅ Passed |
| 15 | Natural Logarithm | `ln(e)` | `1` | ✅ Passed |
| 16 | Percentages | `50 × 10%` | `5` | ✅ Passed |
| 17 | Reciprocal | `1 / 4` | `0.25` | ✅ Passed |
| 18 | Absolute Value | `abs(-42)` | `42` | ✅ Passed |

---

## 🌐 Deploy to Vercel

This repository is pre-configured with `vercel.json` for one-click deployment:

### Option A: Via Vercel Dashboard (Recommended)
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete SmartCalc Pro application"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New"** > **"Project"**.
4. Import your **`gopika-1245/calculator`** repository.
5. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your calculator is live in seconds!

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
