import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addVat(price: number) {
  return Math.round(price * 1.21);
}

export function getImageDimensions(url: string): [number, number] | null {
  const match = url.match(/-(\d+)x(\d+)-/);
  return match ? [parseInt(match[1]), parseInt(match[2])] : null;
}
