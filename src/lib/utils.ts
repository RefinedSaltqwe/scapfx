import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isImageUrl = (url: string): boolean => {
  // Regular expression to check if URL ends with an image extension (e.g., jpg, png, jpeg, gif)
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
  return imageExtensions.test(url);
};
