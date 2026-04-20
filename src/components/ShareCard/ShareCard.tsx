import { forwardRef } from 'react';
import type { CartItem } from '@/types';
import { formatBillions } from '@/utils/format';

interface ShareCardProps {
  billionaireName: string;
  worth: number;
  spent: number;
  remaining: number;
  spentPct: number;
  cart: CartItem[];
}

const c = {
  bg:        '#ffffff',
  surface:   '#f8fafc',
  accent:    '#22c55e',
  accentDk:  '#16a34a',
  text:      '#0f172a',
  secondary: '#475569',
  muted:     '#94a3b8',
  border:    '#e2e8f0',
  greenBg:   '#f0fdf4',
};

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ billionaireName, worth, spent, remaining, spentPct, cart }, ref) => {
    const displayItems = cart.slice(0, 4);
    const moreCount = cart.length - displayItems.length;
    const exhausted = remaining === 0;

    return (
      <div
        ref={ref}
        style={{
          width: 600,
          height: 340,
          background: c.bg,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
          borderRadius: 16,
          border: `1px solid ${c.border}`,
        }}
      >
        {/* Top bar */}
        <div style={{
          background: c.accent,
          padding: '10px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Spend a Billionaire&apos;s Fortune
          </span>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>
            forbes 2024
          </span>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

          {/* Left — headline */}
          <div style={{
            flex: '0 0 260px',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: `1px solid ${c.border}`,
            background: c.greenBg,
          }}>
            <div>
              <p style={{ fontSize: 12, color: c.muted, marginBottom: 6, letterSpacing: '0.05em' }}>
                I spent
              </p>
              <p style={{ fontSize: 44, fontWeight: 600, color: c.text, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 8 }}>
                {formatBillions(spent)}
              </p>
              <p style={{ fontSize: 13, color: c.secondary }}>
                of {billionaireName}&apos;s {formatBillions(worth)} fortune
              </p>
            </div>

            {/* Progress bar */}
            <div>
              <div style={{ height: 4, background: c.border, borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
                <div style={{ height: '100%', width: `${spentPct}%`, background: c.accent, borderRadius: 99 }} />
              </div>
              <p style={{ fontSize: 11, color: c.muted }}>
                {spentPct}% spent
                {exhausted
                  ? ' · Spent it all!'
                  : ` · ${formatBillions(remaining)} remaining`}
              </p>
            </div>
          </div>

          {/* Right — items */}
          <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, marginBottom: 12 }}>
              Cart
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {displayItems.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{item.emoji}</span>
                  <span style={{ flex: 1, fontSize: 12, color: c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.qty > 1 && <span style={{ color: c.accentDk, fontWeight: 600, marginRight: 3 }}>×{item.qty}</span>}
                    {item.name}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: c.accentDk, flexShrink: 0 }}>
                    {formatBillions(item.price * item.qty)}
                  </span>
                </div>
              ))}
              {moreCount > 0 && (
                <p style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>
                  + {moreCount} more item{moreCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';
export default ShareCard;
