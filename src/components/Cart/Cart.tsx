'use client';

import type { CartItem } from '@/types';
import { formatBillions } from '@/utils/format';
import styles from './Cart.module.css';

interface CartProps {
  cart: CartItem[];
  spent: number;
  onRemove: (name: string) => void;
  onClear: () => void;
  onShare: () => void;
  cartOpen?: boolean;
  onCartToggle?: () => void;
}

export default function Cart({ cart, spent, onRemove, onClear, onShare, cartOpen, onCartToggle }: CartProps) {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <aside className={`${styles.cartArea} ${cartOpen ? styles.cartAreaOpen : ''}`}>
      <button className={styles.cartHandle} onClick={onCartToggle} aria-label="Toggle cart">
        <span className={styles.cartHandleLeft}>
          <span className={styles.cartHandleIcon}>🛒</span>
          <span className={styles.cartHandleCount}>
            {totalQty === 0 ? 'Cart empty' : `${totalQty} item${totalQty !== 1 ? 's' : ''}`}
          </span>
        </span>
        <span className={styles.cartHandleRight}>
          {spent > 0 && <span className={styles.cartHandleTotal}>{formatBillions(spent)}</span>}
          <span className={styles.cartChevron}>{cartOpen ? '▾' : '▴'}</span>
        </span>
      </button>

      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <p className={styles.cartTitle}>Your cart</p>
          {cart.length > 0 && (
            <button className={styles.shareBtn} onClick={onShare}>
              Share
            </button>
          )}
        </div>
        {cart.length === 0 ? (
          <p className={styles.cartEmpty}>
            Nothing yet.<br />Start spending.
          </p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.name} className={styles.cartItem}>
                <span className={styles.cartEmoji}>{item.emoji}</span>
                <span className={styles.cartItemName}>
                  {item.qty > 1 && <span className={styles.cartQty}>×{item.qty} </span>}
                  {item.name}
                </span>
                <span className={styles.cartItemPrice}>{formatBillions(item.price * item.qty)}</span>
                <button className={styles.cartRemove} onClick={() => onRemove(item.name)}>✕</button>
              </div>
            ))}
            <div className={styles.cartTotal}>
              <span className={styles.cartTotalLabel}>Total spent</span>
              <span className={styles.cartTotalVal}>{formatBillions(spent)}</span>
            </div>
            <button className={styles.cartClear} onClick={onClear}>Clear cart</button>
          </>
        )}
      </div>
    </aside>
  );
}
