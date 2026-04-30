import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { NAV_LINKS } from '@/data/navLinks';

const socialIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  LinkedIn: Linkedin,
};

export function Footer() {
  return (
    <footer style={{ background: '#0a0f1e' }} className="text-white">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* Brand column */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="mb-1 flex items-center">
              <div
                style={{
                  maskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 45%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 45%, transparent 100%)',
                  mixBlendMode: 'screen',
                }}
              >
                <Image
                  src="/images/logos/logo-white.png"
                  alt="DriveToOwn"
                  width={280}
                  height={84}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              Drive Today. Own Tomorrow.
            </p>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-white/45">
              Victoria&apos;s most flexible car program — rent week-to-week or lease to own. No credit check required.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {Object.entries(socialIcons).map(([platform, Icon]) => (
                <a
                  key={platform}
                  href={
                    platform === 'Facebook'
                      ? process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '#'
                      : platform === 'Instagram'
                      ? process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#'
                      : process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow DriveToOwn on ${platform}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-white/30">Explore</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-white/55 transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-white/30">Contact</h3>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <p className="mb-0.5 font-bold text-white/80">AMY &amp; YAS PTY LTD</p>
                <p className="text-xs text-white/35">33 Princes Cct, Craigieburn VIC 3064</p>
              </li>
              <li>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_MELBOURNE}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {process.env.NEXT_PUBLIC_PHONE_MELBOURNE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {process.env.NEXT_PUBLIC_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/25 sm:flex-row">
          <p>© {new Date().getFullYear()} AMY &amp; YAS PTY LTD (DriveToOwn). All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-white/50">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white/50">Terms</Link>
            <span>ABN: 89 675 615 960</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
