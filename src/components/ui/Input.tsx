import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-semibold text-text">
          {label}
          {props.required && <span className="ml-1 text-red" aria-hidden="true">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'rounded-lg border border-border px-4 py-3 text-base text-text placeholder:text-muted focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 transition-colors',
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

Input.displayName = 'Input';
