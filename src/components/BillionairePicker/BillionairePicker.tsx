'use client';

import type { Billionaire } from '@/types';
import styles from './BillionairePicker.module.css';

interface BillionairePickerProps {
  billionaires: Billionaire[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}

export default function BillionairePicker({ billionaires, activeIdx, onSelect }: BillionairePickerProps) {
  return (
    <nav className={styles.billBar}>
      <span className={styles.billLabel}>Pick one</span>
      {billionaires.map((b, i) => (
        <button
          key={b.name}
          className={`${styles.billBtn} ${activeIdx === i ? styles.billBtnActive : ''}`}
          onClick={() => onSelect(i)}
        >
          {b.name}
          <span className={styles.billBtnWorth}>${b.worth}B</span>
        </button>
      ))}
    </nav>
  );
}
