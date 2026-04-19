'use client';

import type { Item } from '@/types';
import { formatBillions } from '@/utils/format';
import styles from './ItemCard.module.css';

interface ItemCardProps {
  item: Item;
  canAfford: boolean;
  isFlashing: boolean;
  onBuy: (item: Item) => void;
}

export default function ItemCard({ item, canAfford, isFlashing, onBuy }: ItemCardProps) {
  return (
    <div className={`${styles.itemCard} ${isFlashing ? styles.itemCardFlash : ''}`}>
      <span className={styles.itemEmoji}>{item.emoji}</span>
      <p className={styles.itemName}>{item.name}</p>
      <p className={styles.itemDesc}>{item.desc}</p>
      <p className={styles.itemPrice}>{formatBillions(item.price)}</p>
      <button
        className={styles.itemBuyBtn}
        onClick={() => onBuy(item)}
        disabled={!canAfford}
      >
        {canAfford ? 'Buy this' : "Can't afford"}
      </button>
    </div>
  );
}
