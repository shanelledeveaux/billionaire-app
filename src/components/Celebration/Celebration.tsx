'use client';

import styles from './Celebration.module.css';

interface CelebrationProps {
  billionaireName: string;
  onReset: () => void;
}

export default function Celebration({ billionaireName, onReset }: CelebrationProps) {
  return (
    <div className={styles.celebration}>
      <p className={styles.celebrationEmoji}>🎉</p>
      <p className={styles.celebrationText}>You spent every last billion.</p>
      <p className={styles.celebrationSub}>
        {`This is what it takes to make a dent in ${billionaireName}'s wealth.`}
      </p>
      <button className={styles.celebrationReset} onClick={onReset}>
        Start over
      </button>
    </div>
  );
}
