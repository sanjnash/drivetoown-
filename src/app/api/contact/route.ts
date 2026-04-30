import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';

// Simple in-memory rate limiter: max 3 per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'VALIDATION_ERROR' }, { status: 400 });
    }

    const data = parsed.data;

    // Honeypot check — silent reject
    if (data.honeypot) {
      return NextResponse.json({ success: true, message: 'Your enquiry has been submitted.' });
    }

    // Rate limit by IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, error: 'RATE_LIMITED' }, { status: 429 });
    }

    // Send email via Resend (gracefully skip if key not set)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? 'noreply@drivetoown.com.au',
          to: process.env.RESEND_TO_EMAIL ?? 'enquiries@drivetoown.com.au',
          reply_to: data.email,
          subject: `New Enquiry from ${data.fullName} — ${data.carInterest}`,
          text: [
            `Name: ${data.fullName}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone}`,
            `City: ${data.city}`,
            `Car Interest: ${data.carInterest}`,
            `Message:\n${data.message}`,
          ].join('\n'),
        });
      } catch (emailError) {
        console.error('[api/contact] Email send failed:', emailError);
        // Don't fail the request — still save lead
      }
    }

    // Save lead to Supabase (gracefully skip if not configured)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('leads').insert({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          city: data.city ?? 'Melbourne',
          car_interest: data.carInterest,
          message: data.message,
          source: 'website',
        });
      } catch (dbError) {
        console.error('[api/contact] Supabase insert failed:', dbError);
      }
    }

    return NextResponse.json({ success: true, message: 'Your enquiry has been submitted.' });
  } catch (error) {
    console.error('[api/contact] Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
