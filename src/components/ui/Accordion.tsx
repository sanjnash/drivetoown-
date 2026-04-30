'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FAQ } from '@/types/faq';

export interface AccordionProps {
  items: FAQ[];
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-text transition-colors hover:text-red"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn('h-5 w-5 shrink-0 text-muted transition-transform duration-300', isOpen && 'rotate-180 text-red')}
                aria-hidden="true"
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="leading-relaxed text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
