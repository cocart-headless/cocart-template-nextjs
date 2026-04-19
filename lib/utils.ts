import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProductCurrency } from "./cocart.d";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string, currency?: ProductCurrency): string {
  const num = parseInt(price, 10);
  if (isNaN(num)) return price;
  if (!currency) {
    return `$${(num / 100).toFixed(2)}`;
  }
  const value = num / Math.pow(10, currency.currency_minor_unit);
  return `${currency.currency_prefix}${value.toFixed(currency.currency_minor_unit)}${currency.currency_suffix}`;
}
