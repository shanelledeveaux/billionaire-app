# Spend a Billionaire's Fortune

An interactive wealth-perspective tool that makes extreme inequality tangible. Pick a billionaire, spend their fortune, or dial in a wealth tax and see what it could fund.

**[Live demo](#)** · Built with Next.js 16 · React 19 · TypeScript · CSS Modules

---

## What it does

Wealth at the billionaire scale is genuinely hard to comprehend. This tool makes it visceral in two ways:

**Spend it** — Pick a billionaire, shop across 30 items in six categories (luxury, enterprise, housing, healthcare, education, public good), and watch a $240B fortune barely flinch. A live earnings counter ticks up in real time showing how fast they earn back everything you just spent.

**Tax it** — Set a wealth tax rate and choose how many billionaires to include. See live revenue estimates mapped against the actual cost of 12 programs across the full political spectrum — from Medicaid expansion to VA healthcare to doubling NASA's budget.

---

## Features

- **Live earnings counter** — appears when you start spending; shows how much the billionaire has already earned back and how long it would take to fully recoup your cart
- **Milestone toasts** — fire at 25%, 50%, 90%, and 100% spent; the pacing is part of the point
- **"Surprise me"** — randomly fills a cart to illustrate how hard it is to spend this much
- **Share** — copies a plain-text cart summary to clipboard
- **Cart quantity consolidation** — buying the same item shows ×3, not three rows
- **Buy flash animation** on item cards
- **Celebration screen** when you exhaust the fortune
- **Mobile cart drawer** — fixed bottom sheet that slides up; stays accessible without scrolling
- **Politically balanced content** — Enterprise category for business/industry items; tax programs span progressive and conservative priorities, listed alphabetically

---

## Tech

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server components, file-based routing, no config overhead |
| Language | TypeScript | Typed props across 11 components; shared interfaces in `src/types/` |
| Styling | CSS Modules + design tokens | Scoped per component; all raw values live in `src/styles/tokens.css` |
| State | React hooks only | All state lives in `BillionaireApp` — no external library needed |
| Data | Static JS files | Easy to swap for a live API; seeded from Forbes 2024 |

---

## Architecture

11 focused components, each in its own folder with a CSS module and test file:

```
src/
├── styles/tokens.css                 ← design token system (primitives → semantic → component)
├── types/index.ts                    ← shared TypeScript interfaces
├── data/billionaires.js              ← billionaires, items, tax programs
├── utils/format.js                   ← formatBillions helper
└── components/
    ├── BillionaireApp/               ← state orchestrator
    ├── Hero/                         ← headline + mode toggle
    ├── BillionairePicker/            ← billionaire nav (spend mode only)
    ├── FortuneBar/                   ← remaining balance + progress bar (spend mode only)
    ├── EarningsCounter/              ← live earnings ticker (appears on first purchase)
    ├── SpendMode/                    ← shop layout (tabs, grid, cart)
    ├── ItemCard/                     ← purchasable item card
    ├── Cart/                         ← sidebar on desktop, bottom sheet on mobile
    ├── Celebration/                  ← 100% spent screen
    ├── TaxMode/                      ← sliders + program funding grid
    └── Toast/                        ← milestone notifications
```

All state is owned by `BillionaireApp` and passed down through typed props. No context, no reducers — the data flow is intentionally readable.

---

## Design system

Styles are built on a three-layer token system in `src/styles/tokens.css`:

1. **Primitives** — raw scale values (`--_green-500`, `--_neutral-200`), never used directly in components
2. **Semantic** — intent-named aliases (`--color-text-accent`, `--color-bg-surface`, `--color-border-subtle`)
3. **Component** — scoped aliases for recurring patterns (`--card-border-hover`, `--btn-ghost-color`, `--progress-fill`)

Typography, spacing, radius, shadow, and motion are all tokenized. Every component CSS module references only `var(--token)` — no hardcoded hex values.

The palette is light and neutral — white surfaces, cool off-white canvas (`#f8fafc`), with `#22c55e` / `#16a34a` as the accent. The data does the heavy lifting; the UI stays out of its way.

---

## Data sources

All figures are approximations intended to illustrate scale, not precise policy estimates.

| Data point | Source |
|---|---|
| Net worth | Forbes Real-Time Billionaires List, 2024 |
| Earnings rate | Forbes annual wealth growth (2023) ÷ 31,557,600 sec/yr |
| Tax model | Simplified flat rate on net worth above $1B; Forbes 400 avg (~$4.28B) as per-person baseline |
| NFL franchise value | Forbes NFL Team Valuations, 2024 (avg $5.7B) |
| Private space trip | Blue Origin / SpaceX reported orbital pricing |
| Nuclear plant | DOE / NRC AP1000 reactor cost estimate |
| Oil refinery | EIA refinery construction data (300k bbl/day) |
| Family farms | USDA National Agricultural Statistics Service |
| Median home price | National Association of Realtors, 2024 (~$400k) |
| Veteran homelessness | HUD-VA Annual Homeless Assessment Report, 2023 |
| Hospital construction | AHA / Deloitte Health (~$100M per hospital) |
| Insulin costs | KFF Insulin Affordability Report, 2023 |
| Cancer research | NCI FY2024 congressional budget (~$7B/yr) |
| Dental care | KFF Oral Health Coverage survey |
| Pell Grants | College Board / US Department of Education |
| Universal pre-K | NIEER / HHS cost estimates |
| End world hunger | UN World Food Programme Annual Report, 2023 |
| Free public transit | APTA (American Public Transportation Association) |
| Solar panels | NREL / SEIA residential installation cost data |
| Clean water | WHO / UN Sustainable Development Goal estimates |
| Clean energy transition | Inflation Reduction Act, CBO 10-year score |
| Roads & bridges | Infrastructure Investment and Jobs Act, CBO analysis |
| NASA double budget | NASA FY2024 Congressional Budget Justification |
| School lunches | USDA Food and Nutrition Service |
| Medicaid expansion | KFF / CBO |
| VA healthcare | VA FY2024 budget request / CBO |
| Police & fire grants | DOJ COPS program; NFPA national data |
| Farm & rural support | USDA Farm Service Agency |
| Cyber defense | CISA / OMB federal cybersecurity budget |

---

## Run locally

```bash
npm install
npm run dev
```

No extra dependencies beyond Next.js and React.
