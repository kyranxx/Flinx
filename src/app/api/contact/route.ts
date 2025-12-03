import { NextRequest, NextResponse } from 'next/server';

// Email configuration - You need to set these environment variables
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your-email@example.com'; // Your email to receive notifications

interface ContactFormData {
    name: string;
    email: string;
    website: string;
    message?: string;
    captchaToken: string;
}

// Verify reCAPTCHA
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
            body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
        });

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('ReCAPTCHA verification error:', error);
        return false;
    }
}

// Send email using nodemailer
async function sendEmail(to: string, subject: string, htmlContent: string) {
    // For now, we'll use a simple approach
    // You'll need to install nodemailer: npm install nodemailer
    // Or use a service like Resend, SendGrid, or AWS SES

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT || '587'),
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

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();
        const { name, email, website, message, captchaToken } = body;

        // Validate required fields
        if (!name || !email || !website || !captchaToken) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify reCAPTCHA
        const isValidCaptcha = await verifyRecaptcha(captchaToken);
        if (!isValidCaptcha) {
            return NextResponse.json(
                { error: 'Invalid reCAPTCHA. Please try again.' },
                { status: 400 }
            );
        }

        // Check if email sending is configured
        if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
            console.error('Email configuration is incomplete');
            // For now, log the submission
            console.log('Contact form submission:', { name, email, website, message });

            // Return success anyway (you can change this behavior)
            return NextResponse.json({
                success: true,
                message: 'Form received. Email configuration pending.',
            });
        }

        // Email to admin (you)
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
              <h2>🚀 New Flinx Quote Request!</h2>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> ${email}
              </div>
              <div class="info-row">
                <span class="label">Website:</span> <a href="${website}">${website}</a>
              </div>
              ${message ? `
              <div class="info-row">
                <span class="label">Message:</span><br>
                ${message}
              </div>
              ` : ''}
              <p style="margin-top: 20px; color: #6b7280;">
                Received at: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

        // Email to customer (confirmation)
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
            .button { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">⚡ Flinx</div>
              <h2>Thank you for contacting us!</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We've received your request for a website optimization quote. Our team is analyzing your website and will get back to you within 24 hours with a personalized proposal.</p>
              
              <p><strong>Your submission details:</strong></p>
              <ul>
                <li><strong>Website:</strong> ${website}</li>
                <li><strong>Email:</strong> ${email}</li>
              </ul>
              
              <p>In the meantime, feel free to check out our website for more information about how we can help boost your site's performance.</p>
              
              <p style="margin-top: 30px;">Best regards,<br><strong>The Flinx Team</strong></p>
              
              <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
                If you didn't submit this form, please ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

        try {
            // Send email to admin
            await sendEmail(
                ADMIN_EMAIL,
                `New Quote Request from ${name}`,
                adminEmailContent
            );

            // Send confirmation email to customer
            await sendEmail(
                email,
                'We received your Flinx quote request! 🚀',
                customerEmailContent
            );

            return NextResponse.json({
                success: true,
                message: 'Emails sent successfully',
            });
        } catch (emailError) {
            console.error('Error sending emails:', emailError);
            return NextResponse.json(
                { error: 'Failed to send emails. Please try again later.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'An error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
