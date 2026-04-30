const features = [
  {
    emoji: '🛡️',
    title: 'No Credit History Needed',
    description: 'We look at your driving history, not your credit score. Perfect for new arrivals, international students, and visa holders.',
  },
  {
    emoji: '📈',
    title: 'Every Payment Builds Equity',
    description: 'Unlike a regular rental, your weekly payments on the Flexi Own plan count toward owning the car outright.',
  },
  {
    emoji: '🔄',
    title: 'Flexible — Change Anytime',
    description: "Switch cars. Pause. Give 4 weeks' notice to exit. Your plan works around your life, not the other way around.",
  },
  {
    emoji: '🛟',
    title: '24/7 Support',
    description: "Our team is always available. Breakdown, billing, or anything else — we're a call or WhatsApp away, any time.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-red">Why DriveToOwn</span>
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Built for people who deserve a car.
          </h2>
          <p className="mt-3 text-base text-muted">
            We believe everyone — regardless of credit history — deserves access to reliable transport.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-2xl border-[1.5px] border-slate-100 bg-slate-50 p-5 transition-all duration-200 hover:border-navy hover:bg-white hover:shadow-card"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-xl">
                <span role="img" aria-hidden="true">{feature.emoji}</span>
              </div>
              <div>
                <h3 className="mb-1.5 text-sm font-bold text-navy md:text-base">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
