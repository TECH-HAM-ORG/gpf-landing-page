import { NextResponse } from 'next/server';

interface ContactRequestBody {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  monthlyVolume?: string;
  message?: string;
  honeypot?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const { name, email, company, country, monthlyVolume, message, honeypot } = body;

    // 1. Honeypot check (anti-spam bot trap)
    if (honeypot && honeypot.trim().length > 0) {
      // Silently discard bot submission
      return NextResponse.json(
        { ok: false, error: 'Spam detected' },
        { status: 400 }
      );
    }

    // 2. Field validation
    const errors: Record<string, string> = {};

    if (!name || name.trim().length < 2) {
      errors.name = 'Full name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid work email address.';
    }

    if (!company || company.trim().length < 2) {
      errors.company = 'Company name must be at least 2 characters.';
    }

    if (!country || country.trim().length < 2) {
      errors.country = 'Please provide your country.';
    }

    if (!monthlyVolume || monthlyVolume.trim().length === 0) {
      errors.monthlyVolume = 'Please select your estimated monthly volume.';
    }

    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors },
        { status: 400 }
      );
    }

    // 3. Log valid submission (PII masked for security/compliance)
    const maskedEmail = email ? email.replace(/^(.{2})(.*)(@.*)$/, '$1***$3') : '';
    console.log('[CONTACT_REQUEST_RECEIVED]', {
      name: name?.trim(),
      company: company?.trim(),
      country: country?.trim(),
      monthlyVolume: monthlyVolume?.trim(),
      maskedEmail,
      messageLength: message?.trim().length,
      receivedAt: new Date().toISOString(),
    });

    // TODO: Connect email provider (SendGrid / Resend / AWS SES) to notify sales & dispatch confirmation to client

    return NextResponse.json({
      ok: true,
      success: true,
      message: 'Access request submitted successfully. Our team will contact you shortly.',
    });
  } catch (err) {
    console.error('[CONTACT_API_ERROR]', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to process access request.' },
      { status: 500 }
    );
  }
}
