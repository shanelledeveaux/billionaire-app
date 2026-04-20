'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { Mode, CartItem, Item } from '@/types';
import { billionaires, categories, items, taxPrograms } from '@/data/billionaires';
import { formatBillions } from '@/utils/format';
import Toast from '@/components/Toast/Toast';
import Hero from '@/components/Hero/Hero';
import BillionairePicker from '@/components/BillionairePicker/BillionairePicker';
import FortuneBar from '@/components/FortuneBar/FortuneBar';
import EarningsCounter from '@/components/EarningsCounter/EarningsCounter';
import ShareCard from '@/components/ShareCard/ShareCard';
import SpendMode from '@/components/SpendMode/SpendMode';
import TaxMode from '@/components/TaxMode/TaxMode';
import Footer from '@/components/Footer/Footer';
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
  const [isSharing, setIsSharing] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownMilestonesRef = useRef(new Set<number>());
  const shareCardRef = useRef<HTMLDivElement>(null);

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

  const shareResults = useCallback(async () => {
    if (cart.length === 0 || !shareCardRef.current || isSharing) return;
    setIsSharing(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), 'image/png')
      );
      const file = new File([blob], 'billionaire-fortune.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `I spent ${formatBillions(spent)} of ${current.name}'s fortune` });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'billionaire-fortune.png';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Card saved!');
      }
    } catch {
      showToast('Could not generate card.');
    } finally {
      setIsSharing(false);
    }
  }, [cart, isSharing, spent, current.name]);

  return (
    <div className={styles.app}>
      {toast && <Toast message={toast} />}

      {/* Hidden capture target for html2canvas */}
      {cart.length > 0 && (
        <div style={{ position: 'absolute', left: '-9999px', top: 0, pointerEvents: 'none', zIndex: -1 }}>
          <ShareCard
            ref={shareCardRef}
            billionaireName={current.name}
            worth={current.worth}
            spent={spent}
            remaining={remaining}
            spentPct={spentPct}
            cart={cart}
          />
        </div>
      )}

      <Hero
        billionaire={current}
        mode={mode}
        onModeChange={setMode}
      />

      {mode === 'spend' && (
        <BillionairePicker
          billionaires={billionaires}
          activeIdx={billIdx}
          onSelect={switchBillionaire}
        />
      )}

      {mode === 'spend' && (
        <FortuneBar
          remaining={remaining}
          spent={spent}
          spentPct={spentPct}
          totalItems={totalItems}
        />
      )}

      {mode === 'spend' && spent > 0 && (
        <EarningsCounter
          key={billIdx}
          earningsPerSec={current.earningsPerSec}
          spent={spent}
          billionaireName={current.name}
        />
      )}

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
          isSharing={isSharing}
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

      <Footer />
    </div>
  );
}
