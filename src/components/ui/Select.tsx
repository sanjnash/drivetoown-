import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-semibold text-text">
          {label}
          {props.required && <span className="ml-1 text-red" aria-hidden="true">*</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'rounded-lg border border-border bg-white px-4 py-3 text-base text-text focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 transition-colors',
            error && 'border-red focus:border-red focus:ring-red/20',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red" role="alert">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
