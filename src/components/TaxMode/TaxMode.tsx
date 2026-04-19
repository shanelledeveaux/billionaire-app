'use client';

import type { TaxProgram } from '@/types';
import { formatBillions } from '@/utils/format';
import styles from './TaxMode.module.css';

interface TaxModeProps {
  taxRate: number;
  billCount: number;
  taxRevenue: number;
  programs: TaxProgram[];
  onTaxRateChange: (rate: number) => void;
  onBillCountChange: (count: number) => void;
}

export default function TaxMode({
  taxRate,
  billCount,
  taxRevenue,
  programs,
  onTaxRateChange,
  onBillCountChange,
}: TaxModeProps) {
  return (
    <div className={styles.taxPanel}>
      <p className={styles.taxHeader}>Set the wealth tax rate</p>

      <div className={styles.sliderRow}>
        <div className={styles.sliderLabel}>
          <span>Tax rate on net worth above $1B</span>
          <span className={styles.sliderVal}>{taxRate}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={taxRate}
          onChange={e => onTaxRateChange(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.sliderRow}>
        <div className={styles.sliderLabel}>
          <span>Billionaires included (Forbes 400)</span>
          <span className={styles.sliderVal}>{billCount}</span>
        </div>
        <input
          type="range"
          min="10"
          max="400"
          step="10"
          value={billCount}
          onChange={e => onBillCountChange(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <p className={styles.taxResultBig}>{formatBillions(taxRevenue)}</p>
      <p className={styles.taxResultLabel}>annual revenue generated</p>
      <p className={styles.taxNote}>{"That's enough to fund these programs:"}</p>

      <div className={styles.programsGrid}>
        {programs.map((p, i) => {
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
  );
}
