import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

interface ContactFormData {
    name: string;
    email: string;
    website: string;
    message: string;
    captchaToken: string;
}

interface RecaptchaResponse {
    success?: boolean;
}

function escapeHtml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function normalizeSubject(value: string): string {
    return value.replace(/[\r\n]+/g, ' ').trim();
}

function parsePayload(body: unknown): ContactFormData | null {
    if (!body || typeof body !== 'object') {
        return null;
    }

    const record = body as Record<string, unknown>;
    const getString = (key: string) => {
        const value = record[key];
        return typeof value === 'string' ? value.trim() : '';
    };

    const name = getString('name');
    const email = getString('email');
    const websiteInput = getString('website');
    const message = getString('message');
    const captchaToken = getString('captchaToken');

    if (!name || !email || !websiteInput || !captchaToken) {
        return null;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
        return null;
    }

    let website: string;
    try {
        const url = new URL(websiteInput);
        if (!['http:', 'https:'].includes(url.protocol)) {
            return null;
        }
        website = url.href;
    } catch {
        return null;
    }

    return {
        name: name.slice(0, 120),
        email,
        website,
        message: message.slice(0, 5000),
        captchaToken,
    };
}

async function verifyRecaptcha(token: string): Promise<boolean> {
    if (!RECAPTCHA_SECRET_KEY) {
        console.error('RECAPTCHA_SECRET_KEY is not configured');
        return false;
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: RECAPTCHA_SECRET_KEY,
                response: token,
            }),
        });

        const data = await response.json() as RecaptchaResponse;
        return data.success === true;
    } catch (error) {
        console.error('ReCAPTCHA verification error:', error);
        return false;
    }
}

function hasEmailConfig(): boolean {
    return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && ADMIN_EMAIL);
}

async function sendEmail(to: string, subject: string, htmlContent: string) {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        throw new Error('SMTP configuration is incomplete');
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number.parseInt(SMTP_PORT || '587', 10),
        secure: SMTP_PORT === '465',
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: SMTP_USER,
        to,
        subject,
        html: htmlContent,
    });
}

function buildEmailHtml(data: ContactFormData) {
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeWebsite = escapeHtml(data.website);
    const safeMessage = escapeHtml(data.message).replaceAll('\n', '<br />');

    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #6366f1; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Flinx Quote Request</h2>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Name:</span> ${safeName}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> ${safeEmail}
              </div>
              <div class="info-row">
                <span class="label">Website:</span> <a href="${safeWebsite}">${safeWebsite}</a>
              </div>
              ${safeMessage ? `
              <div class="info-row">
                <span class="label">Message:</span><br>
                ${safeMessage}
              </div>
              ` : ''}
              <p style="margin-top: 20px; color: #6b7280;">
                Received at: ${new Date().toISOString()}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const customerEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Flinx</div>
              <h2>Thank you for contacting us!</h2>
            </div>
            <div class="content">
              <p>Hi ${safeName},</p>
              <p>We've received your request for a website optimization quote. Our team will review your website and get back to you with a personalized proposal.</p>
              <p><strong>Your submission details:</strong></p>
              <ul>
                <li><strong>Website:</strong> ${safeWebsite}</li>
                <li><strong>Email:</strong> ${safeEmail}</li>
              </ul>
              <p style="margin-top: 30px;">Best regards,<br><strong>The Flinx Team</strong></p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
                If you didn't submit this form, please ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    return {
        adminEmailContent,
        customerEmailContent,
    };
}

export async function POST(request: NextRequest) {
    try {
        const payload = parsePayload(await request.json());

        if (!payload) {
            return NextResponse.json(
                { error: 'Please provide a valid name, email, website, and reCAPTCHA.' },
                { status: 400 }
            );
        }

        const isValidCaptcha = await verifyRecaptcha(payload.captchaToken);
        if (!isValidCaptcha) {
            return NextResponse.json(
                { error: 'Invalid reCAPTCHA. Please try again.' },
                { status: 400 }
            );
        }

        if (!hasEmailConfig() || !ADMIN_EMAIL) {
            console.error('Email configuration is incomplete');
            return NextResponse.json(
                { error: 'Contact form is not configured yet.' },
                { status: 503 }
            );
        }

        const { adminEmailContent, customerEmailContent } = buildEmailHtml(payload);

        await sendEmail(
            ADMIN_EMAIL,
            `New Quote Request from ${normalizeSubject(payload.name)}`,
            adminEmailContent
        );

        await sendEmail(
            payload.email,
            'We received your Flinx quote request',
            customerEmailContent
        );

        return NextResponse.json({
            success: true,
            message: 'Emails sent successfully',
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'An error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
