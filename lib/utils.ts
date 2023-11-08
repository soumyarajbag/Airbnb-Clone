import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomNumber(): number {
  const min = 2000;
  const max = 20000;
  return Math.floor(Math.random() * (max - min + 1) + min) ;
}

export function bytesToMb(bytes:number):number{
  const MB = 1048576;
  return bytes / MB;
}

export function getImageURL(path:string):string{
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_S3_BUCKET}/${path}`
}