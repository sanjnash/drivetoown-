import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RunningCar } from '@/components/layout/RunningCar';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

export const metadata: Metadata = {
  title: {
    default: 'DriveToOwn — Drive Today, Own Tomorrow',
    template: '%s | DriveToOwn',
  },
  description:
    'Rent or lease to own a car in Melbourne, Victoria. No credit check required. Weekly payments from $199. Open to everyone.',
  keywords: ['lease to own car', 'car lease Melbourne', 'no credit check car', 'Melbourne car rental', 'car rental Victoria', 'weekly car rental Melbourne'],
  authors: [{ name: 'AMY & YAS PTY LTD' }],
  creator: 'DriveToOwn',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'DriveToOwn',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'DriveToOwn — Rent or Lease to Own in Melbourne' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <RunningCar />
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
