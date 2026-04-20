'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './EarningsCounter.module.css';

interface EarningsCounterProps {
  earningsPerSec: number;
  spent: number; // billions
  billionaireName: string;
}

function formatDollars(n: number): string {
  if (n < 1000) return `$${Math.floor(n)}`;
  if (n < 1_000_000) return `$${(n / 1000).toFixed(1)}K`;
  if (n < 1_000_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${(n / 1_000_000_000).toFixed(3)}B`;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  if (days < 365) return `${days}d ${hours}h`;
  const years = Math.floor(days / 365);
  const remDays = Math.floor(days % 365);
  return `${years}yr ${remDays}d`;
}

export default function EarningsCounter({ earningsPerSec, spent, billionaireName }: EarningsCounterProps) {
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setElapsed(0);

    intervalRef.current = setInterval(() => {
      setElapsed((Date.now() - startTimeRef.current) / 1000);
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const earned = elapsed * earningsPerSec;
  const spentDollars = spent * 1_000_000_000;
  const timeToRecoup = spentDollars / earningsPerSec;

  return (
    <div className={styles.counter}>
      <div className={styles.block}>
        <p className={styles.label}>
          <span className={styles.labelFull}>Earned back since you started</span>
          <span className={styles.labelShort}>Earned back</span>
        </p>
        <p className={styles.val}>{formatDollars(earned)}</p>
        <p className={styles.rate}>${earningsPerSec.toLocaleString()}/sec · {billionaireName}</p>
      </div>
      <div className={`${styles.block} ${styles.blockRight}`}>
        <p className={styles.label}>
          <span className={styles.labelFull}>Time to recoup your cart</span>
          <span className={styles.labelShort}>To recoup cart</span>
        </p>
        <p className={styles.time}>{formatTime(timeToRecoup)}</p>
        <p className={styles.rate}>{formatDollars(spentDollars)} at current rate</p>
      </div>
    </div>
  );
}
