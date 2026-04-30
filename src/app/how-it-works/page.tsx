import type { Metadata } from 'next';
import { Search, FileText, Zap, Key, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'How It Works | Simple 4-Step Process',
  description:
    'Learn how DriveToOwn works. Choose your car, pick rent or finance, sign the contract, and get on the road. No credit check. Melbourne, VIC.',
};

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Choose Your Car',
    description:
      'Browse our fleet and pick the car that suits your needs and budget. All cars are 5-star ANCAP rated and GPS-equipped.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Sign the Contract',
    description:
      'Submit your documents and sign the DriveToOwn agreement. No credit check required. We need your licence and proof of address — that\'s it.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Start Earning',
    description:
      'Get on the road immediately. Use the car however you need. On the Flexi Own (lease to own) plan, your weekly payments go toward owning the car.',
  },
  {
    number: '04',
    icon: Key,
    title: 'Own With Pride',
    description:
      'Complete your contract and payments. The car is legally transferred to your name. No more repayments — it\'s yours.',
  },
];

const documents = [
  'Valid Australian Driver\'s Licence',
  'Proof of Address (utility bill or bank statement)',
  'Passport or Visa (international applicants)',
  'Driving History (last 3 years)',
];

const eligibility = [
  'Must be 21 years or older',
  'Hold a valid Australian driver\'s licence',
  'Clean driving history (no serious offences)',
  'Able to meet weekly payment schedule',
  'Based in Victoria',
];

const planComparison = [
  { feature: 'Weekly Price', flexi: 'From $179/wk', flexiOwn: 'From $239/wk' },
  { feature: 'Joining Fee', flexi: '$275 excl. GST', flexiOwn: '$900 excl. GST' },
  { feature: 'Km Allowance', flexi: '1,000 km/wk', flexiOwn: '2,000 km/wk' },
  { feature: 'Minimum Period', flexi: '26 weeks', flexiOwn: '4 years' },
  { feature: 'Own at End?', flexi: 'No', flexiOwn: '✓ Yes' },
  { feature: 'No Credit Check', flexi: '✓', flexiOwn: '✓' },
  { feature: 'GPS Included', flexi: '✓', flexiOwn: '✓' },
  { feature: 'Switch Cars', flexi: 'By arrangement', flexiOwn: 'By arrangement' },
  { feature: 'Best For', flexi: 'Flexible renting', flexiOwn: 'Building to ownership' },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader title="How It Works" subtitle="Get on the road in four simple steps" />

      {/* Steps */}
      <SectionWrapper background="white">
        <div className="grid gap-12 md:gap-16">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col items-center gap-8 md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-navy text-white shadow-card">
                <step.icon className="h-16 w-16" aria-hidden="true" />
              </div>
              <div>
                <p className="mb-1 text-sm font-bold uppercase tracking-widest text-red">
                  Step {step.number}
                </p>
                <h2 className="mb-3 text-2xl font-bold text-navy">{step.title}</h2>
                <p className="text-lg leading-relaxed text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Plans comparison */}
      <SectionWrapper background="sky">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-navy">Compare Plans</h2>
          <p className="mt-3 text-muted">Choose the plan that matches your goals.</p>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-card">
          <div className="min-w-[500px]">
            {/* Header */}
            <div className="grid grid-cols-3 bg-navy text-white">
              <div className="p-4 text-sm font-bold uppercase tracking-wider">Feature</div>
              <div className="p-4 text-center text-sm font-bold uppercase tracking-wider">Flexi</div>
              <div className="p-4 text-center text-sm font-bold uppercase tracking-wider bg-red">
                Flexi Own ⭐
              </div>
            </div>
            {planComparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 divide-x divide-border border-b border-border ${i % 2 === 0 ? 'bg-white' : 'bg-sky'}`}
              >
                <div className="p-4 text-sm font-semibold text-navy">{row.feature}</div>
                <div className="p-4 text-center text-sm text-muted">{row.flexi}</div>
                <div className="p-4 text-center text-sm font-semibold text-navy">{row.flexiOwn}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Documents + Eligibility */}
      <SectionWrapper background="white">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-navy">Documents Required</h2>
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
                  <span className="text-muted">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold text-navy">Eligibility</h2>
            <ul className="space-y-3">
              {eligibility.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
