import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export default function isBase64Image(imageData:string){
  const base64REgex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64REgex.test(imageData);
}