import { TESTIMONIALS } from '@/data/testimonials';
import { getInitials } from '@/lib/utils';

const AVATAR_COLORS = ['bg-navy', 'bg-red', 'bg-blue-600', 'bg-green-700', 'bg-purple-700'];

export function Testimonials() {
  const displayTestimonials = TESTIMONIALS.slice(0, 3);

  return (
    <section
      style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)' }}
      className="py-16 md:py-24"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-red">Real Stories</span>
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">From our drivers.</h2>
          <p className="mt-3 text-base text-muted">
            Real reviews from real customers across Melbourne, Victoria.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {displayTestimonials.map((t, i) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
            >
              {/* Stars */}
              <div className="mb-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} aria-hidden="true">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-5 text-sm italic leading-relaxed text-slate-600">
                <span className="mr-0.5 text-2xl not-italic leading-none text-slate-200">&ldquo;</span>
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                  aria-hidden="true"
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.location}
                    {t.carDriven ? ` · ${t.carDriven}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
