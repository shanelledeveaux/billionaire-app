# Spend a Billionaire's Fortune
### A wealth perspective tool — portfolio project

An interactive data experience that lets users either spend a billionaire's net worth item by item, or simulate a wealth tax and see what public programs it could fund.

---

## Tech stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: CSS Modules (dark-first, green money theme)
- **State**: React hooks only — no external state library needed
- **Data**: Static JS files (easy to swap for an API)

---

## Project structure

```
src/
├── app/
│   └── page.jsx              # Next.js App Router entry
├── components/
│   ├── BillionaireApp.jsx    # Main interactive component
│   └── BillionaireApp.module.css
├── data/
│   └── billionaires.js       # All billionaires, items, programs
└── utils/
    └── format.js             # Number formatting helpers
```

---

## Getting started

```bash
# In your existing Next.js project:
# 1. Copy src/components/, src/data/, src/utils/ into your project
# 2. Add the page route:

# src/app/spend/page.jsx
import BillionaireApp from '@/components/BillionaireApp'
export default function Page() { return <BillionaireApp /> }
```

No extra dependencies — uses only React + Next.js.

---

## Features

### Spend mode
- Pick from 5 real billionaires with accurate 2024 net worth data
- Browse 20 items across 5 categories (Luxury, Housing, Healthcare, Education, Public good)
- Running cart with remove/clear functionality
- Animated progress bar tracking spend %
- Items disable when you can no longer afford them

### Tax mode
- Slider: tax rate 1–10%
- Slider: number of billionaires included (10–400)
- Live revenue calculation
- 6 real program cost comparisons with animated funding bars
- Color-coded: green = fully funded, amber = partial, red = insufficient

---

## Roadmap / enhancements

- [ ] Shareable summary card (copy or screenshot with og:image)
- [ ] Add more billionaires (pull from Forbes API or scrape)
- [ ] "Per second" earning ticker in the hero (how fast they earn while you browse)
- [ ] Animated counter when fortune changes
- [ ] Toast notification when you buy something
- [ ] Mobile bottom sheet for the cart
- [ ] "What could YOUR salary do?" comparison mode
- [ ] Sources/methodology modal for credibility
- [ ] Social share with cart summary
- [ ] Dark/light mode toggle (currently dark-only)

---

## Data sources

- Net worth figures: Forbes Billionaires List 2024
- Program costs: CBO, Urban Institute, UN WFP estimates
- Tax revenue model: simplified flat-rate on net worth above $1B,
  using Forbes 400 average net worth (~$4.28B) as baseline

---

## Design notes

**Color palette**: Deep forest green background (#0a1a0a) with #4caf50 accent.
Communicates wealth, greed, and money — intentionally uncomfortable.

**Typography**: System sans-serif, editorial scale. The headline is the hero.

**Tone**: Playful but pointed. The data is real. The absurdity is the point.
