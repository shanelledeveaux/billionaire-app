'use client';

import type { Item, CartItem } from '@/types';
import ItemCard from '@/components/ItemCard/ItemCard';
import Cart from '@/components/Cart/Cart';
import Celebration from '@/components/Celebration/Celebration';
import styles from './SpendMode.module.css';

interface SpendModeProps {
  categories: string[];
  activeCat: string;
  filteredItems: Item[];
  remaining: number;
  flashItem: string | null;
  spentPct: number;
  cart: CartItem[];
  spent: number;
  billionaireName: string;
  onCatChange: (cat: string) => void;
  onBuy: (item: Item) => void;
  onRemove: (name: string) => void;
  onClear: () => void;
  onShare: () => void;
  onSurprise: () => void;
}

export default function SpendMode({
  categories,
  activeCat,
  filteredItems,
  remaining,
  flashItem,
  spentPct,
  cart,
  spent,
  billionaireName,
  onCatChange,
  onBuy,
  onRemove,
  onClear,
  onShare,
  onSurprise,
}: SpendModeProps) {
  return (
    <div className={styles.mainGrid}>
      <div className={styles.shopArea}>
        <div className={styles.shopHeader}>
          <div className={styles.catTabs}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.catTab} ${activeCat === cat ? styles.catTabActive : ''}`}
                onClick={() => onCatChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className={styles.surpriseBtn} onClick={onSurprise}>
            Surprise me
          </button>
        </div>

        {spentPct >= 100 ? (
          <Celebration billionaireName={billionaireName} onReset={onClear} />
        ) : (
          <div className={styles.itemsGrid}>
            {filteredItems.map((item, i) => (
              <ItemCard
                key={i}
                item={item}
                canAfford={remaining >= item.price}
                isFlashing={flashItem === item.name}
                onBuy={onBuy}
              />
            ))}
          </div>
        )}
      </div>

      <Cart
        cart={cart}
        spent={spent}
        onRemove={onRemove}
        onClear={onClear}
        onShare={onShare}
      />
    </div>
  );
}
