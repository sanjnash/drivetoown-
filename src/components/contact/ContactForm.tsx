'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CARS } from '@/data/cars';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^(\+?614|04)\d{8}$/, 'Please enter a valid Australian mobile number'),
  carInterest: z.string().min(1, 'Please select a car or choose "Not sure yet"'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const carOptions = [
  ...CARS.map((c) => ({ value: c.name, label: `${c.name} — $${c.weeklyPrice}/wk` })),
  { value: 'Not sure yet', label: 'Not sure yet — help me choose' },
];

export function ContactForm({ prefillCar }: { prefillCar?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { carInterest: prefillCar ?? '' },
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, city: 'Melbourne' }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(
          json.error === 'RATE_LIMITED'
            ? 'Too many submissions. Please try again later.'
            : 'Something went wrong. Please try again or call us directly.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-green-50 p-10 text-center">
        <CheckCircle className="mb-4 h-16 w-16 text-green-600" aria-hidden="true" />
        <h3 className="mb-2 text-2xl font-bold text-navy">Message Sent!</h3>
        <p className="text-muted">We&apos;ll be in touch within 24 hours. Check your email for a confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register('honeypot')} aria-hidden="true" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="John Smith"
          required
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <Input
        label="Mobile Number"
        type="tel"
        placeholder="0450 555 555"
        required
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Select
        label="Car Interest"
        options={carOptions}
        placeholder="Which car are you interested in?"
        required
        error={errors.carInterest?.message}
        {...register('carInterest')}
      />

      <Textarea
        label="Message"
        placeholder="Tell us a bit about yourself and what you're looking for..."
        required
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      {status === 'error' && (
        <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" loading={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : (
          <span className="flex items-center justify-center gap-2">
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Enquiry
          </span>
        )}
      </Button>

      <p className="text-center text-xs text-muted">
        We reply within 24 hours. Your information is kept private.
      </p>
    </form>
  );
}
