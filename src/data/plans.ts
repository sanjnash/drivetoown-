import type { Plan } from '@/types/plan';

export const PLANS: Plan[] = [
  {
    id: 'flexi',
    name: 'Flexi',
    tagline: 'Rent week-to-week with no long commitment.',
    weeklyPriceFrom: 179,
    joiningFee: 275,
    kmAllowance: 1000,
    excessKmRate: 10, // 10 cents per km
    minimumWeeks: 26,
    noticePeriodWeeks: 4,
    features: [
      'No credit history required',
      '1,000 km/week included',
      '5-star ANCAP rated cars',
      'GPS included',
      'Switch cars by arrangement',
      '26-week minimum subscription',
    ],
    isRecommended: false,
  },
  {
    id: 'flexi-own',
    name: 'Flexi Own',
    tagline: 'Pay weekly and own your car at the end. Lease to own.',
    weeklyPriceFrom: 239,
    joiningFee: 900,
    kmAllowance: 2000,
    excessKmRate: 10,
    minimumWeeks: 208, // 4 years
    noticePeriodWeeks: 4,
    features: [
      'Own the car at end of contract',
      '2,000 km/week included',
      'No credit history required',
      '5-star ANCAP rated cars',
      'GPS included',
      'Drive faster to ownership with extra km',
    ],
    isRecommended: true,
  },
];
