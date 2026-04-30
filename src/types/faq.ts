export type FAQCategory = 'general' | 'car' | 'fees';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}
