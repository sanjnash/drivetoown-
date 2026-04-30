import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={textareaId} className="text-sm font-semibold text-text">
          {label}
          {props.required && <span className="ml-1 text-red" aria-hidden="true">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-[120px] rounded-lg border border-border px-4 py-3 text-base text-text placeholder:text-muted focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 transition-colors resize-y',
            error && 'border-red focus:border-red focus:ring-red/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red" role="alert">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
