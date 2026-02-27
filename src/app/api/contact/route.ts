import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'info@firstchristiansallianceoutreach.org';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend API key missing. Email simulated.");
      return NextResponse.json({ success: true, simulated: true });
    }

    const { data, error } = await resend.emails.send({
      from: 'FCAO Website <onboarding@resend.dev>', // Update to your verified domain e.g. 'noreply@firstchristiansallianceoutreach.org'
      to: notificationEmail,
      subject: `New Contact Form Message from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
