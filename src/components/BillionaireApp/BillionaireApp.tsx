'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import type { Mode, CartItem, Item } from '@/types';
import { billionaires, categories, items, taxPrograms } from '@/data/billionaires';
import { formatBillions } from '@/utils/format';
import Toast from '@/components/Toast/Toast';
import Hero from '@/components/Hero/Hero';
import BillionairePicker from '@/components/BillionairePicker/BillionairePicker';
import FortuneBar from '@/components/FortuneBar/FortuneBar';
import SpendMode from '@/components/SpendMode/SpendMode';
import TaxMode from '@/components/TaxMode/TaxMode';
import styles from './BillionaireApp.module.css';

export default function BillionaireApp() {
  const [mode, setMode] = useState<Mode>('spend');
  const [billIdx, setBillIdx] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCat, setActiveCat] = useState('All');
  const [taxRate, setTaxRate] = useState(2);
  const [billCount, setBillCount] = useState(400);
  const [toast, setToast] = useState<string | null>(null);
  const [flashItem, setFlashItem] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownMilestonesRef = useRef(new Set<number>());

  const current = billionaires[billIdx];
  const spent = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const remaining = Math.max(0, current.worth - spent);
  const spentPct = Math.min(100, Math.round((spent / current.worth) * 100));
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredItems = useMemo(
    () => activeCat === 'All' ? items : items.filter((i: Item) => i.cat === activeCat),
    [activeCat]
  );

  const taxRevenue = useMemo(() => {
    const avgWorth = 4.28;
    const taxable = avgWorth - 1;
    return Math.round(taxable * (taxRate / 100) * billCount * 10) / 10;
  }, [taxRate, billCount]);

  function showToast(msg: string) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  }

  useEffect(() => {
    if (cart.length === 0) return;
    const milestones = [
      { pct: 25, msg: `A quarter of ${current.name}'s fortune — spent.` },
      { pct: 50, msg: `Half of $${current.worth}B gone. Keep going.` },
      { pct: 90, msg: `Almost there — 90% spent.` },
      { pct: 100, msg: `You spent every last billion.` },
    ];
    for (const m of milestones) {
      if (spentPct >= m.pct && !shownMilestonesRef.current.has(m.pct)) {
        shownMilestonesRef.current.add(m.pct);
        showToast(m.msg);
        break;
      }
    }
  }, [spentPct, cart.length, current.name, current.worth]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  function buyItem(item: Item) {
    if (remaining < item.price) return;
    setFlashItem(item.name);
    setTimeout(() => setFlashItem(null), 400);
    setCart(prev => {
      const idx = prev.findIndex(i => i.name === item.name);
      if (idx >= 0) {
        return prev.map((i, n) => n === idx ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeItem(name: string) {
    setCart(prev => {
      const idx = prev.findIndex(i => i.name === name);
      if (idx < 0) return prev;
      if (prev[idx].qty > 1) {
        return prev.map((i, n) => n === idx ? { ...i, qty: i.qty - 1 } : i);
      }
      return prev.filter((_, n) => n !== idx);
    });
  }

  function switchBillionaire(idx: number) {
    setBillIdx(idx);
    setCart([]);
    shownMilestonesRef.current = new Set();
  }

  function surpriseMe() {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const newCart: CartItem[] = [];
    let budget = current.worth;
    for (const item of shuffled) {
      if (budget < item.price) continue;
      const maxQty = Math.min(8, Math.floor(budget / item.price));
      const qty = Math.max(1, Math.ceil(Math.random() * maxQty));
      newCart.push({ ...item, qty });
      budget -= item.price * qty;
    }
    setCart(newCart);
  }

  function shareResults() {
    if (cart.length === 0) return;
    const itemList = cart
      .map(i => `${i.qty > 1 ? `${i.qty}× ` : ''}${i.name}`)
      .join(', ');
    const text = `I spent ${formatBillions(spent)} of ${current.name}'s $${current.worth}B fortune!\n\nI bought: ${itemList}.\n\n${remaining > 0 ? `Still had ${formatBillions(remaining)} left over.` : 'Spent it all!'}`;
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
  }

  return (
    <div className={styles.app}>
      {toast && <Toast message={toast} />}

      <Hero
        billionaire={current}
        mode={mode}
        onModeChange={setMode}
      />

      <BillionairePicker
        billionaires={billionaires}
        activeIdx={billIdx}
        onSelect={switchBillionaire}
      />

      <FortuneBar
        remaining={remaining}
        spent={spent}
        spentPct={spentPct}
        totalItems={totalItems}
      />

      {mode === 'spend' && (
        <SpendMode
          categories={categories}
          activeCat={activeCat}
          filteredItems={filteredItems}
          remaining={remaining}
          flashItem={flashItem}
          spentPct={spentPct}
          cart={cart}
          spent={spent}
          billionaireName={current.name}
          onCatChange={setActiveCat}
          onBuy={buyItem}
          onRemove={removeItem}
          onClear={() => setCart([])}
          onShare={shareResults}
          onSurprise={surpriseMe}
        />
      )}

      {mode === 'tax' && (
        <TaxMode
          taxRate={taxRate}
          billCount={billCount}
          taxRevenue={taxRevenue}
          programs={taxPrograms}
          onTaxRateChange={setTaxRate}
          onBillCountChange={setBillCount}
        />
      )}
    </div>
  );
}
