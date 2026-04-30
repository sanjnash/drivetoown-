export type PlanType = 'flexi' | 'flexi-own';

export interface Plan {
  id: PlanType;
  name: string;
  tagline: string;
  weeklyPriceFrom: number;
  joiningFee: number;
  kmAllowance: number;
  excessKmRate: number;
  minimumWeeks: number;
  noticePeriodWeeks: number;
  features: string[];
  isRecommended?: boolean;
}
