import type { FAQ } from '@/types/faq';

export const FAQS: FAQ[] = [
  // General
  {
    id: 'what-is-drivetoown',
    question: 'What is DriveToOwn?',
    answer:
      'DriveToOwn offers two flexible car options in Victoria: the Flexi plan for straightforward weekly rental, and the Flexi Own plan — a lease-to-own arrangement where your weekly payments go toward owning the car outright. No credit check required — anyone can apply.',
    category: 'general',
  },
  {
    id: 'minimum-age',
    question: 'What is the minimum age to apply?',
    answer: 'You must be at least 21 years old with a valid Australian driver\'s licence.',
    category: 'general',
  },
  {
    id: 'eligibility',
    question: 'What documents do I need to apply?',
    answer:
      'You will need: a valid Australian driver\'s licence, proof of address (utility bill or bank statement), and a passport or visa for international applicants. No rideshare approval or partner verification is required.',
    category: 'general',
  },
  {
    id: 'credit-check',
    question: 'Do you do a credit check?',
    answer:
      'No. We do not run a credit check. We assess your application based on your driving history and ability to meet weekly payments. Our program is open to everyone — including international students, visa holders, and new arrivals to Australia.',
    category: 'general',
  },
  {
    id: 'where-available',
    question: 'What cities do you operate in?',
    answer:
      'We currently operate in Melbourne, Victoria. We do not operate in any other states at this time.',
    category: 'general',
  },
  {
    id: 'minimum-period',
    question: 'What is the minimum subscription period?',
    answer:
      'The minimum subscription is 26 weeks (approximately 6 months). After the minimum period, you can exit with 4 weeks\' written notice.',
    category: 'general',
  },
  {
    id: 'who-can-apply',
    question: 'Who can apply?',
    answer:
      'Anyone with a valid Australian driver\'s licence can apply — there is no requirement to be a rideshare driver or have any platform approval. Whether you need a car for personal use, work, or family, you are welcome to apply.',
    category: 'general',
  },

  // Car Information
  {
    id: 'gps-included',
    question: 'Does every car have GPS?',
    answer:
      'Yes. GPS tracking is included in every car in our fleet at no extra cost. This is required for insurance and fleet management purposes.',
    category: 'car',
  },
  {
    id: 'ancap-rating',
    question: 'What safety rating do your cars have?',
    answer:
      'All cars in our fleet carry a 5-star ANCAP safety rating — the highest possible. We will not add a car to our fleet unless it meets this standard.',
    category: 'car',
  },
  {
    id: 'km-allowance',
    question: 'How many kilometres can I drive per week?',
    answer:
      'On the Flexi plan you receive 1,000 km per week. On the Flexi Own plan you receive 2,000 km per week. Excess kilometres are charged at 10 cents per km.',
    category: 'car',
  },
  {
    id: 'switch-cars',
    question: 'Can I switch to a different car?',
    answer:
      'On the Flexi plan, car switches are available by arrangement. On the Flexi Own plan, your contract is tied to the specific car you are purchasing, so switches are not standard — please speak to our team if your circumstances change.',
    category: 'car',
  },
  {
    id: 'personal-use',
    question: 'Can I use the car for any purpose?',
    answer:
      'Yes. You can use the car for any legal purpose — personal, family, work, or rideshare. There are no restrictions on how you use the car within your weekly km allowance.',
    category: 'car',
  },
  {
    id: 'interstate',
    question: 'Can I drive the car interstate?',
    answer:
      'Driving outside of Victoria is not permitted under your contract without prior written approval from our team. Please contact us if you need to travel interstate.',
    category: 'car',
  },

  // Fees & Payments
  {
    id: 'weekly-payment-day',
    question: 'When are weekly payments charged?',
    answer:
      'Weekly payments are charged every Wednesday night for the following Monday–Sunday period. Payments are processed by direct debit.',
    category: 'fees',
  },
  {
    id: 'joining-fee',
    question: 'What is the joining fee?',
    answer:
      'The Flexi plan joining fee is $275 (excl. GST). The Flexi Own plan joining fee is $900 (excl. GST). The joining fee is non-refundable. If you exit the program early and wish to re-join, the joining fee must be paid again.',
    category: 'fees',
  },
  {
    id: 'late-payment',
    question: 'What happens if I miss a payment?',
    answer:
      'A late payment fee of $40 applies for any payment not received by the due date. If your direct debit is dishonoured by your bank, a dishonoured direct debit fee of $40 also applies.',
    category: 'fees',
  },
  {
    id: 'dishonoured-payment',
    question: 'What is the dishonoured direct debit fee?',
    answer:
      'If a scheduled direct debit fails because of insufficient funds or any other reason, a $40 dishonoured direct debit fee is charged in addition to the outstanding weekly payment.',
    category: 'fees',
  },
  {
    id: 'early-exit',
    question: 'Can I exit the contract early?',
    answer:
      'After the 26-week minimum period, you may exit with 4 weeks\' written notice. Exiting before the minimum period means you forfeit the joining fee and may be liable for additional costs. Please contact us to discuss your situation.',
    category: 'fees',
  },
  {
    id: 'gst',
    question: 'Do prices include GST?',
    answer:
      'All weekly prices displayed on our public website include GST. The joining fee is quoted excluding GST — so the Flexi Own joining fee is $900 excl. GST ($990 incl. GST).',
    category: 'fees',
  },
  {
    id: 'early-settlement',
    question: 'Can I pay off my Flexi Own contract early?',
    answer:
      'Yes, you can settle your Flexi Own contract early. Please contact our team and we will calculate your remaining settlement figure. Early settlement means the car transfers to your name sooner.',
    category: 'fees',
  },
];
