import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { MapEmbed } from '@/components/contact/MapEmbed';

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE_MELBOURNE ?? '+61455445285';
  const email = process.env.NEXT_PUBLIC_EMAIL ?? 'hello@drivetoown.com.au';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '61455445285';

  return (
    <>
      {/* Hero — navy */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-red/10" aria-hidden="true" />

        <div className="container-custom relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-red">Contact Us</p>
            <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              Let&apos;s Get You Behind the Wheel
            </h1>
            <p className="mb-10 text-lg text-white/70">
              Ready to apply or have a question? Call or message us — we&apos;re here to help.
            </p>

            {/* Quick contact pills */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Phone className="h-4 w-4 text-red" aria-hidden="true" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Mail className="h-4 w-4 text-red" aria-hidden="true" />
                {email}
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366]/20 px-5 py-2.5 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/30"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA cards + Info panel */}
      <section className="bg-sky py-16 md:py-24">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-5">

            {/* Reach us card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-card lg:col-span-3">
              <div className="bg-navy px-8 py-5">
                <h2 className="text-xl font-bold text-white">Get in Touch</h2>
                <p className="mt-1 text-sm text-white/60">Pick the option that suits you best.</p>
              </div>
              <div className="space-y-4 p-8">
                {/* Call */}
                <a
                  href={`tel:${phone}`}
                  className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-red hover:bg-sky"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red/10">
                      <Phone className="h-6 w-6 text-red" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-navy">Call Us</p>
                      <p className="text-sm text-muted">Speak to us directly — fastest response</p>
                      <p className="mt-0.5 font-semibold text-red">{phone}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-red" aria-hidden="true" />
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 p-5 transition-colors hover:bg-[#25D366]/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20">
                      <MessageCircle className="h-6 w-6 text-[#25D366]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-navy">WhatsApp</p>
                      <p className="text-sm text-muted">Message us anytime — we reply within hours</p>
                      <p className="mt-0.5 font-semibold text-[#25D366]">Chat now</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-[#25D366]" aria-hidden="true" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-red hover:bg-sky"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red/10">
                      <Mail className="h-6 w-6 text-red" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-navy">Email Us</p>
                      <p className="text-sm text-muted">Send us your question — reply within 24 hours</p>
                      <p className="mt-0.5 font-semibold text-red">{email}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-red" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Info panel */}
            <div className="flex flex-col gap-6 lg:col-span-2">

              {/* Location + Hours */}
              <div className="rounded-2xl bg-white p-6 shadow-card">
                <h3 className="mb-5 text-lg font-bold text-navy">Office Details</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky">
                      <MapPin className="h-5 w-5 text-red" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">Address</p>
                      <p className="mt-0.5 font-semibold text-navy">33 Princes Cct</p>
                      <p className="text-sm text-muted">Craigieburn VIC 3064</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky">
                      <Phone className="h-5 w-5 text-red" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">Phone</p>
                      <a
                        href={`tel:${phone}`}
                        className="mt-0.5 block font-semibold text-navy transition-colors hover:text-red"
                      >
                        {phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky">
                      <Mail className="h-5 w-5 text-red" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">Email</p>
                      <a
                        href={`mailto:${email}`}
                        className="mt-0.5 block font-semibold text-navy transition-colors hover:text-red"
                      >
                        {email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky">
                      <Clock className="h-5 w-5 text-red" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">Hours</p>
                      <p className="mt-0.5 font-semibold text-navy">Mon – Sat: 9am – 6pm</p>
                      <p className="text-sm text-muted">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Response time badge */}
              <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
                  <p className="font-semibold text-navy">Typically replies within 24 hours</p>
                </div>
                <p className="mt-2 text-sm text-muted">
                  For urgent enquiries, WhatsApp or call us directly for the fastest response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <section aria-label="Office location map">
        <div className="bg-navy px-0">
          <div className="container-custom pb-0 pt-10">
            <div className="mb-6 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-red">Find Us</p>
              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">33 Princes Cct, Craigieburn VIC 3064</h2>
            </div>
          </div>
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
