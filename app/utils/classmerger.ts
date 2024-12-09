import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//Use tailwind merge with clsx so that you can pass in objects
//and still get the class ordering correctly set
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
