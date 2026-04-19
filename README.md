# Spend a Billionaire's Fortune

An interactive wealth-perspective tool that makes extreme inequality tangible. Users can either spend a billionaire's net worth item by item, or dial in a wealth tax and see what public programs it could fund.

**[Live demo](#)** · Built with Next.js 16 · React 19 · TypeScript · CSS Modules

---

![Dark green UI showing Elon Musk's $240B fortune with a shopping cart](public/preview.png)

---

## What it does

Wealth at the billionaire scale is genuinely hard to comprehend. This tool makes it visceral in two ways:

**Spend it** — Pick a billionaire, shop through 20 real items across five categories (private jets, hospitals, clean water access, universal pre-K), and watch a $240B fortune barely flinch.

**Tax it** — Set a wealth tax rate and choose how many billionaires to include. See live revenue estimates mapped against the actual cost of programs like Medicaid expansion, free school lunches, and debt-free community college.

---

## Features

- Milestone toasts at 25%, 50%, 90%, and 100% spent — the pacing is part of the point
- "Surprise me" — randomly fills a cart to illustrate how hard it is to spend this much
- Share button — copies a plain-text summary of your cart to clipboard
- Cart with quantity consolidation — buying the same item shows ×3, not three rows
- Buy flash animation on item cards
- Celebration screen when you exhaust the fortune
- Net worth displayed on every billionaire selector button
- Fully responsive — cart stacks below the grid on mobile

---

## Tech

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server components, file-based routing, no config overhead |
| Language | TypeScript | Typed props across 10 components; shared types in `src/types/` |
| Styling | CSS Modules | Scoped per component, zero runtime cost, no Tailwind dependency |
| State | React hooks only | All state lives in `BillionaireApp` — no external library needed |
| Data | Static TS files | Easy to swap for a live API; currently seeded from Forbes 2024 |

---

## Architecture

The app is broken into 10 focused components, each with its own folder, CSS module, and test file:

```
src/
├── types/index.ts                    ← shared interfaces
├── data/billionaires.js              ← billionaires, items, tax programs
├── utils/format.js                   ← formatBillions, formatPercent
└── components/
    ├── BillionaireApp/               ← state orchestrator
    ├── Hero/                         ← headline + mode toggle
    ├── BillionairePicker/            ← billionaire nav
    ├── FortuneBar/                   ← remaining balance + progress bar
    ├── SpendMode/                    ← shop layout (tabs, grid, cart)
    ├── ItemCard/                     ← purchasable item card
    ├── Cart/                         ← cart sidebar
    ├── Celebration/                  ← 100% spent screen
    ├── TaxMode/                      ← sliders + program funding grid
    └── Toast/                        ← milestone notifications
```

All state is owned by `BillionaireApp` and passed down through typed props. No context, no reducers — the data flow is intentionally readable.

---

## Data sources

- **Net worth**: Forbes Billionaires List 2024
- **Program costs**: CBO, Urban Institute, UN World Food Programme
- **Tax model**: Simplified flat rate on net worth above $1B, using Forbes 400 average (~$4.28B) as the per-person baseline

---

## Design

Deep forest green background (`#0a1a0a`) with a `#4caf50` money-green accent. The palette communicates wealth and greed — intentionally uncomfortable. Typography is system sans-serif at editorial scale; the headline does most of the work. The tone is playful but the data is real.

---

## Run locally

```bash
npm install
npm run dev
```

No extra dependencies beyond Next.js and React.
