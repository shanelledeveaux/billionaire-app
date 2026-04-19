'use client';

import { useState, useMemo } from 'react';
import { billionaires, categories, items, taxPrograms } from '@/data/billionaires';
import { formatBillions, formatPercent } from '@/utils/format';
import styles from './BillionaireApp.module.css';

export default function BillionaireApp() {
  const [mode, setMode] = useState('spend');
  const [billIdx, setBillIdx] = useState(0);
  const [cart, setCart] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const [taxRate, setTaxRate] = useState(2);
  const [billCount, setBillCount] = useState(400);

  const current = billionaires[billIdx];
  const spent = cart.reduce((sum, item) => sum + item.price, 0);
  const remaining = Math.max(0, current.worth - spent);
  const spentPct = Math.min(100, Math.round((spent / current.worth) * 100));

  const filteredItems = useMemo(
    () => activeCat === 'All' ? items : items.filter(i => i.cat === activeCat),
    [activeCat]
  );

  const taxRevenue = useMemo(() => {
    const avgWorth = 4.28;
    const taxable = avgWorth - 1;
    return Math.round(taxable * (taxRate / 100) * billCount * 10) / 10;
  }, [taxRate, billCount]);

  function buyItem(item) {
    if (remaining < item.price) return;
    setCart(prev => [...prev, { ...item, cartId: Date.now() + Math.random() }]);
  }

  function removeItem(cartId) {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  }

  function switchBillionaire(idx) {
    setBillIdx(idx);
    setCart([]);
  }

  const progressColor = spentPct > 90 ? '#cc4444' : spentPct > 60 ? '#f0a020' : '#4caf50';

  return (
    <div className={styles.app}>

      {/* Hero */}
      <header className={styles.hero}>
        <p className={styles.eyebrow}>A wealth perspective tool</p>
        <h1 className={styles.headline}>
          What would you do with<br />
          <span className={styles.name}>{current.name}</span>'s{' '}
          <span className={styles.accent}>${current.worth}B?</span>
        </h1>
        <p className={styles.sub}>
          The average American needs {current.years} years to earn this much.
        </p>
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${mode === 'spend' ? styles.modeBtnActive : ''}`}
            onClick={() => setMode('spend')}
          >
            Spend it
          </button>
          <button
            className={`${styles.modeBtn} ${mode === 'tax' ? styles.modeBtnActive : ''}`}
            onClick={() => setMode('tax')}
          >
            Tax it
          </button>
        </div>
      </header>

      {/* Billionaire Picker */}
      <nav className={styles.billBar}>
        <span className={styles.billLabel}>Pick one</span>
        {billionaires.map((b, i) => (
          <button
            key={b.name}
            className={`${styles.billBtn} ${billIdx === i ? styles.billBtnActive : ''}`}
            onClick={() => switchBillionaire(i)}
          >
            {b.name}
          </button>
        ))}
      </nav>

      {/* Fortune Display */}
      <div className={styles.fortuneBar}>
        <div className={styles.fortuneRow}>
          <div>
            <p className={styles.fortuneLabel}>Remaining fortune</p>
            <p className={styles.fortuneVal}>{formatBillions(remaining)}</p>
            <p className={styles.fortuneSpent}>{formatBillions(spent)} spent so far</p>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statMini}>
              <p className={styles.statVal}>{cart.length}</p>
              <p className={styles.statLabel}>items bought</p>
            </div>
            <div className={styles.statMini}>
              <p className={styles.statVal}>{spentPct}%</p>
              <p className={styles.statLabel}>of fortune spent</p>
            </div>
          </div>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${spentPct}%`, background: progressColor }}
          />
        </div>
      </div>

      {/* Spend Mode */}
      {mode === 'spend' && (
        <div className={styles.mainGrid}>
          <div className={styles.shopArea}>
            {/* Category Tabs */}
            <div className={styles.catTabs}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.catTab} ${activeCat === cat ? styles.catTabActive : ''}`}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className={styles.itemsGrid}>
              {filteredItems.map((item, i) => {
                const canAfford = remaining >= item.price;
                return (
                  <div key={i} className={styles.itemCard}>
                    <span className={styles.itemEmoji}>{item.emoji}</span>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemDesc}>{item.desc}</p>
                    <p className={styles.itemPrice}>{formatBillions(item.price)}</p>
                    <button
                      className={styles.itemBuyBtn}
                      onClick={() => buyItem(item)}
                      disabled={!canAfford}
                    >
                      {canAfford ? 'Buy this' : "Can't afford"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart */}
          <aside className={styles.cartArea}>
            <p className={styles.cartTitle}>Your cart</p>
            {cart.length === 0 ? (
              <p className={styles.cartEmpty}>Nothing yet.<br />Start spending.</p>
            ) : (
              <>
                {cart.slice(-8).map(item => (
                  <div key={item.cartId} className={styles.cartItem}>
                    <span className={styles.cartEmoji}>{item.emoji}</span>
                    <span className={styles.cartItemName}>{item.name}</span>
                    <span className={styles.cartItemPrice}>{formatBillions(item.price)}</span>
                    <button className={styles.cartRemove} onClick={() => removeItem(item.cartId)}>✕</button>
                  </div>
                ))}
                {cart.length > 8 && (
                  <p className={styles.cartMore}>+{cart.length - 8} more items</p>
                )}
                <div className={styles.cartTotal}>
                  <span className={styles.cartTotalLabel}>Total spent</span>
                  <span className={styles.cartTotalVal}>{formatBillions(spent)}</span>
                </div>
                <button className={styles.cartClear} onClick={() => setCart([])}>Clear cart</button>
              </>
            )}
          </aside>
        </div>
      )}

      {/* Tax Mode */}
      {mode === 'tax' && (
        <div className={styles.taxPanel}>
          <p className={styles.taxHeader}>Set the wealth tax rate</p>

          <div className={styles.sliderRow}>
            <div className={styles.sliderLabel}>
              <span>Tax rate on net worth above $1B</span>
              <span className={styles.sliderVal}>{taxRate}%</span>
            </div>
            <input
              type="range" min="1" max="10" step="1" value={taxRate}
              onChange={e => setTaxRate(Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.sliderRow}>
            <div className={styles.sliderLabel}>
              <span>Billionaires included (Forbes 400)</span>
              <span className={styles.sliderVal}>{billCount}</span>
            </div>
            <input
              type="range" min="10" max="400" step="10" value={billCount}
              onChange={e => setBillCount(Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          <p className={styles.taxResultBig}>{formatBillions(taxRevenue)}</p>
          <p className={styles.taxResultLabel}>annual revenue generated</p>
          <p className={styles.taxNote}>That's enough to fund these programs:</p>

          <div className={styles.programsGrid}>
            {taxPrograms.map((p, i) => {
              const pct = Math.min(100, Math.round((taxRevenue / p.cost) * 100));
              const funded = taxRevenue >= p.cost;
              const partial = !funded && pct > 20;
              const barColor = funded ? '#4caf50' : partial ? '#f0a020' : '#cc4444';
              return (
                <div key={i} className={styles.programCard}>
                  <span className={styles.programIcon}>{p.emoji}</span>
                  <p className={styles.programName}>{p.name}</p>
                  <p className={styles.programCost}>{p.label}</p>
                  <div className={styles.programBarTrack}>
                    <div className={styles.programBarFill} style={{ width: `${pct}%`, background: barColor }} />
                  </div>
                  <p className={styles.programStatus} style={{ color: barColor }}>
                    {funded ? 'Fully funded' : partial ? `${pct}% covered` : 'Not enough'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
