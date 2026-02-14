import { Tag } from "@/types/product";
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

export function getTags(tags: string[]): Tag[] | undefined {
  if (!tags) return undefined;
  return tags.map((tag: string): Tag => {
    if (tag === "new") return { text: "Novinka", color: "#1db2f8ff" };
    if (tag === "sale") return { text: "Akce", color: "#ef4444" };
    if (tag === "clearance") return { text: "Doprodej", color: "#f59e0b" };
    if (tag === "bestseller") return { text: "Bestseller", color: "#8b5cf6" };
    return { text: "Neznámý", color: "#6b7280" };
  });
}
