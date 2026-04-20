export type Mode = 'spend' | 'tax';

export interface Billionaire {
  name: string;
  worth: number;
  earningsPerSec: number; // dollars/sec based on prior-year wealth growth
  years: string;
  source: string;
}

export interface Item {
  cat: string;
  emoji: string;
  name: string;
  desc: string;
  price: number;
}

export interface CartItem extends Item {
  qty: number;
}

export interface TaxProgram {
  emoji: string;
  name: string;
  cost: number;
  label: string;
}
