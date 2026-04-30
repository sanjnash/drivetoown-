import Link from 'next/link';

const steps = [
  {
    number: '1',
    emoji: '🔍',
    title: 'Choose Your Car',
    description: 'Browse our fleet and pick the car that suits your needs and budget. 13 vehicles, all 5-star ANCAP rated.',
    bg: 'from-blue-100 to-blue-200',
  },
  {
    number: '2',
    emoji: '📋',
    title: 'Sign & Pay $900',
    description: 'Submit your docs and sign the DriveToOwn agreement. Pay the one-off joining fee. No credit check required.',
    bg: 'from-pink-100 to-pink-200',
  },
  {
    number: '3',
    emoji: '🚗',
    title: 'Drive From Day 1',
    description: "Get on the road immediately. Use it for rideshare, commuting, or personal trips — it's your car to drive.",
    bg: 'from-green-100 to-green-200',
  },
  {
    number: '4',
    emoji: '🔑',
    title: 'Own It',
    description: 'Complete your weekly payments and the car is legally yours. No balloon payment. No surprises.',
    bg: 'from-yellow-100 to-yellow-200',
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)' }}
      className="py-16 md:py-24"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-red">The Process</span>
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Own a car in 4 simple steps.
          </h2>
          <p className="mt-3 text-base text-muted">
            From choosing your car to holding the keys — here&apos;s exactly how it works.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {/* Dashed connector (desktop only) */}
          <div
            className="pointer-events-none absolute left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] top-8 hidden h-px md:block"
            style={{
              background: 'repeating-linear-gradient(90deg, #e2e8f0 0, #e2e8f0 8px, transparent 8px, transparent 16px)',
            }}
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Icon tile */}
              <div className="relative z-10 mb-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.bg} shadow-card`}
                >
                  <span className="text-2xl" role="img" aria-hidden="true">{step.emoji}</span>
                </div>
                {/* Number badge */}
                <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                  {step.number}
                </div>
              </div>
              <h3 className="mb-2 text-sm font-bold text-navy md:text-base">{step.title}</h3>
              <p className="text-xs leading-relaxed text-muted md:text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold text-white transition-all hover:bg-navy-light"
          >
            Learn More About the Process
          </Link>
        </div>
      </div>
    </section>
  );
}
