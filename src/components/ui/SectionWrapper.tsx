import { cn } from '@/lib/utils';

export interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: 'white' | 'sky' | 'navy';
}

const backgrounds = {
  white: 'bg-white',
  sky: 'bg-sky',
  navy: 'bg-navy text-white',
};

export function SectionWrapper({
  id,
  className,
  children,
  background = 'white',
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn(backgrounds[background], className)}>
      <div className="section-padding container-custom">{children}</div>
    </section>
  );
}
