import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, phone, crm, company } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send email to the user
    const { data, error } = await resend.emails.send({
      from: 'Eazybe <hey@eazybe.com>',
      to: email,
      subject: 'Your B2B Sales Guide on WhatsApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a2e;">Hey! Your message has been received!</h1>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
            Thank you for your interest in our B2B sales guide on WhatsApp.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
            <strong>Your details:</strong><br/>
            Phone: ${phone || 'Not specified'}<br/>
            CRM: ${crm || 'Not specified'}<br/>
            Company Size: ${company || 'Not specified'}
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
            We'll be in touch soon with your guide!
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
            Best regards,<br/>
            The Eazybe Team
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
