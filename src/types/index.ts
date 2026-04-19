export type Mode = 'spend' | 'tax';

export interface Billionaire {
  name: string;
  worth: number;
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
