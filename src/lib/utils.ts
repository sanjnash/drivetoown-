import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format number as Australian dollar weekly price */
export function formatWeeklyPrice(amount: number): string {
  return `$${amount}/wk`;
}

/** Format number as currency */
export function formatCurrency(amountInCents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(amountInCents / 100);
}

/** Format date string to readable Australian format */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Get initials from a full name (for avatar fallback) */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Calculate ownership date from contract start + weeks */
export function calculateOwnershipDate(contractWeeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() + contractWeeks * 7);
  return date.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
}
