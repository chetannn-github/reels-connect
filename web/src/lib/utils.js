import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function isValidUrl(str) {
  try {
    new URL(str);
    return true; 
  } catch (err) {
    return false;
  }
}