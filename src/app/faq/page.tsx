'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Accordion } from '@/components/ui/Accordion';
import { CTABanner } from '@/components/home/CTABanner';
import { FAQS } from '@/data/faqs';
import { cn } from '@/lib/utils';
import type { FAQCategory } from '@/types/faq';

const tabs: { value: FAQCategory; label: string }[] = [
  { value: 'general', label: 'General Info' },
  { value: 'car', label: 'Car Information' },
  { value: 'fees', label: 'Fees & Payments' },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<FAQCategory>('general');
  const filtered = FAQS.filter((f) => f.category === activeTab);

  return (
    <>
      <PageHeader title="Frequently Asked Questions" subtitle="Everything you need to know about DriveToOwn" />

      <div className="bg-sky section-padding">
        <div className="container-narrow">
          {/* Tabs */}
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                role="tab"
                aria-selected={activeTab === tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-150',
                  activeTab === tab.value
                    ? 'bg-red text-white shadow-card'
                    : 'bg-white text-text hover:bg-sky-mid'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
            <Accordion items={filtered} />
          </div>

          {/* Still have questions */}
          <div className="mt-10 rounded-2xl bg-navy p-8 text-center text-white">
            <h3 className="mb-2 text-xl font-bold">Still have questions?</h3>
            <p className="mb-4 text-white/70">Our team is ready to help.</p>
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_PERTH}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-navy transition-colors hover:bg-sky"
            >
              Call Us: {process.env.NEXT_PUBLIC_PHONE_PERTH}
            </a>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
