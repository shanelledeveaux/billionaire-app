'use client';

import type { Billionaire, Mode } from '@/types';
import styles from './Hero.module.css';

interface HeroProps {
  billionaire: Billionaire;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function Hero({ billionaire, mode, onModeChange }: HeroProps) {
  return (
    <header className={styles.hero}>
      <p className={styles.eyebrow}>A wealth perspective tool</p>
      <h1 className={styles.headline}>
        What would you do with<br />
        <span className={styles.name}>{billionaire.name}</span>{`'s `}
        <span className={styles.accent}>${billionaire.worth}B?</span>
      </h1>
      <p className={styles.sub}>
        The average American needs {billionaire.years} years to earn this much.
      </p>
      <div className={styles.modeToggle}>
        <button
          className={`${styles.modeBtn} ${mode === 'spend' ? styles.modeBtnActive : ''}`}
          onClick={() => onModeChange('spend')}
        >
          Spend it
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'tax' ? styles.modeBtnActive : ''}`}
          onClick={() => onModeChange('tax')}
        >
          Tax it
        </button>
      </div>
    </header>
  );
}
