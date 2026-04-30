'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapEmbed } from '@/components/contact/MapEmbed';

function ContactPageInner() {
  const searchParams = useSearchParams();
  const prefillCar = searchParams.get('car') ?? undefined;

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
              Have a question or ready to apply? We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>

            {/* Quick contact pills */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE_MELBOURNE}`}
                className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Phone className="h-4 w-4 text-red" aria-hidden="true" />
                {process.env.NEXT_PUBLIC_PHONE_MELBOURNE ?? '+61 455 445 285'}
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Mail className="h-4 w-4 text-red" aria-hidden="true" />
                {process.env.NEXT_PUBLIC_EMAIL ?? 'hello@drivetoown.com.au'}
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
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

      {/* Form + Info */}
      <section className="bg-sky py-16 md:py-24">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-5">

            {/* Form card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-card lg:col-span-3">
              {/* Card header */}
              <div className="bg-navy px-8 py-5">
                <h2 className="text-xl font-bold text-white">Send Us a Message</h2>
                <p className="mt-1 text-sm text-white/60">Fill in the form and we&apos;ll be in touch shortly.</p>
              </div>
              <div className="p-8">
                <ContactForm prefillCar={prefillCar} />
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
                        href={`tel:${process.env.NEXT_PUBLIC_PHONE_MELBOURNE}`}
                        className="mt-0.5 block font-semibold text-navy transition-colors hover:text-red"
                      >
                        {process.env.NEXT_PUBLIC_PHONE_MELBOURNE ?? '+61 455 445 285'}
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
                        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                        className="mt-0.5 block font-semibold text-navy transition-colors hover:text-red"
                      >
                        {process.env.NEXT_PUBLIC_EMAIL ?? 'hello@drivetoown.com.au'}
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

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl bg-[#25D366] p-5 text-white shadow-card transition-opacity hover:opacity-90"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  <div>
                    <p className="font-bold">Chat on WhatsApp</p>
                    <p className="text-sm text-white/80">Get a quick response</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>

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

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageInner />
    </Suspense>
  );
}
