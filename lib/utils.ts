import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountTomiliUnit(amount: number) {
  return Math.round(amount * 1000);
}

export function convertAmountFromMilliUnit(amount: number) {
  return amount / 1000;
}

export function formatCurrency(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
