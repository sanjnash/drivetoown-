'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/data/navLinks';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 shadow-card backdrop-blur-md' : 'bg-white'
      )}
    >
      <nav className="container-custom flex h-16 items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div
            style={{
              maskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 45%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 45%, transparent 100%)',
            }}
          >
            <Image
              src="/images/logos/logo.png"
              alt="DriveToOwn"
              width={380}
              height={114}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'relative text-sm font-semibold transition-colors hover:text-red',
                  pathname === link.href
                    ? 'text-red after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-red'
                    : 'text-text'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${process.env.NEXT_PUBLIC_PHONE_MELBOURNE}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-navy"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {process.env.NEXT_PUBLIC_PHONE_MELBOURNE}
          </a>
          <Button href="/contact" size="sm">Get My First Car →</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-text transition-colors hover:bg-sky md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border bg-white transition-all duration-300 md:hidden',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-custom space-y-1 pb-6 pt-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block rounded-lg px-4 py-3 font-semibold transition-colors',
                pathname === link.href
                  ? 'bg-sky text-red'
                  : 'text-text hover:bg-sky hover:text-navy'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button href="/contact" className="w-full">Get My First Car →</Button>
          </div>
          <a
            href={`tel:${process.env.NEXT_PUBLIC_PHONE_MELBOURNE}`}
            className="flex items-center justify-center gap-2 py-3 font-semibold text-muted hover:text-navy"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {process.env.NEXT_PUBLIC_PHONE_MELBOURNE}
          </a>
        </div>
      </div>
    </header>
  );
}
