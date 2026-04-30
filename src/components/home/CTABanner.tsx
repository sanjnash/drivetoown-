import Link from 'next/link';

const trustPills = [
  'No credit check',
  '$0 hidden fees',
  'Drive from Day 1',
  '24/7 support',
];

export function CTABanner() {
  return (
    <section
      className="relative overflow-hidden py-20"
      style={{ background: 'linear-gradient(135deg, #0f2444 0%, #1e3a5f 50%, #0f2444 100%)' }}
    >
      {/* Radial red glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 text-center">
        {/* Tag pill */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/15 px-4 py-1.5 text-xs font-bold text-red-300">
          🚗 Ready when you are
        </div>

        {/* Heading */}
        <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          Your <em className="not-italic text-red">first car</em> is<br className="hidden md:block" /> one step away.
        </h2>

        {/* Subtext */}
        <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-white/65">
          Browse{' '}
          <strong className="font-bold text-white">13 cars</strong>. No credit check. Weekly payments from{' '}
          <strong className="font-bold text-white">$179</strong>.
          Get on the road today.
        </p>

        {/* CTAs */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 rounded-full bg-red px-8 py-4 text-sm font-bold text-white transition-all hover:bg-red-hover"
            style={{ boxShadow: '0 4px 20px rgba(239,68,68,0.35)' }}
          >
            Browse the Fleet →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/15"
          >
            Talk to Us First
          </Link>
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {trustPills.map((pill) => (
            <span key={pill} className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
              <span className="text-green-400">✓</span>
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
