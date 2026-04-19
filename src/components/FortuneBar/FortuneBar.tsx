import { formatBillions } from '@/utils/format';
import styles from './FortuneBar.module.css';

interface FortuneBarProps {
  remaining: number;
  spent: number;
  spentPct: number;
  totalItems: number;
}

export default function FortuneBar({ remaining, spent, spentPct, totalItems }: FortuneBarProps) {
  const progressColor =
    spentPct >= 100 ? '#cc4444' : spentPct > 60 ? '#f0a020' : '#4caf50';

  return (
    <div className={styles.fortuneBar}>
      <div className={styles.fortuneRow}>
        <div>
          <p className={styles.fortuneLabel}>Remaining fortune</p>
          <p className={styles.fortuneVal}>{formatBillions(remaining)}</p>
          <p className={styles.fortuneSpent}>{formatBillions(spent)} spent so far</p>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statMini}>
            <p className={styles.statVal}>{totalItems}</p>
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
  );
}
