import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge"; 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pricy(price: number) {
  const priceString = String(price);
  let result = "";
  for (let i = priceString.length - 1; i >= 0; i--) {
    let j = priceString.length - i - 1;
    if (j % 3 === 2 && i !== 0) {
      result = "." + priceString[i] + result;
    } else {
      result = priceString[i] + result;
    }
  }

  return result + " vnd";
}
