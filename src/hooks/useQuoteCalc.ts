'use client';
import { useState, useMemo } from 'react';
import type { Car } from '@/types/car';
import type { PlanType } from '@/types/plan';
import { calculateOwnershipDate } from '@/lib/utils';

export function useQuoteCalc() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [plan, setPlan] = useState<PlanType>('flexi');
  const [contractYears, setContractYears] = useState<1 | 2 | 3 | 4>(2);

  const quote = useMemo(() => {
    if (!selectedCar) return null;

    // BUSINESS RULE: Flexi Own adds ~10% to weekly price to cover ownership component
    const weeklyPayment =
      plan === 'flexi-own'
        ? Math.round(selectedCar.weeklyPrice * 1.1)
        : selectedCar.weeklyPrice;

    const joiningFee = plan === 'flexi-own' ? 900 : 275;
    const totalWeeks = contractYears * 52;
    const totalWeeklyPayments = weeklyPayment * totalWeeks;
    const totalCost = totalWeeklyPayments + joiningFee;
    const ownershipDate = plan === 'flexi-own' ? calculateOwnershipDate(totalWeeks) : null;

    return {
      weeklyPayment,
      joiningFee,
      totalWeeks,
      totalWeeklyPayments,
      totalCost,
      ownershipDate,
      contractYears,
    };
  }, [selectedCar, plan, contractYears]);

  return {
    selectedCar,
    setSelectedCar,
    plan,
    setPlan,
    contractYears,
    setContractYears,
    quote,
  };
}
