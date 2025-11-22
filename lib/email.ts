import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || 'noreply@meddycare.com';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Send email verification email
 */
export async function sendVerificationEmail(
    email: string,
    name: string,
    verificationToken: string
) {
    const verificationUrl = `${appUrl}/api/auth/verify-email?token=${verificationToken}`;

    try {
        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: 'Verify your MeddyCare account',
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to MeddyCare!</h1>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                <p>Thank you for registering with MeddyCare. Please verify your email address to complete your registration.</p>
                <p style="text-align: center;">
                  <a href="${verificationUrl}" class="button">Verify Email Address</a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't create an account with MeddyCare, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} MeddyCare. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to send verification email:', error);
        return { success: false, error };
    }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
    email: string,
    name: string,
    resetToken: string
) {
    const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

    try {
        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: 'Reset your MeddyCare password',
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                <p>We received a request to reset your password for your MeddyCare account.</p>
                <p style="text-align: center;">
                  <a href="${resetUrl}" class="button">Reset Password</a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
                <div class="warning">
                  <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                </div>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} MeddyCare. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        return { success: false, error };
    }
}

/**
 * Send match notification email to carer
 */
export async function sendMatchNotificationEmail(
    carerEmail: string,
    carerName: string,
    familyName: string,
    careType: string
) {
    try {
        await resend.emails.send({
            from: fromEmail,
            to: carerEmail,
            subject: 'New Care Opportunity - MeddyCare',
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎯 New Care Opportunity!</h1>
              </div>
              <div class="content">
                <p>Hi ${carerName},</p>
                <p>Great news! You've been matched with a family looking for care services.</p>
                <div class="highlight">
                  <p><strong>Family:</strong> ${familyName}</p>
                  <p><strong>Care Type:</strong> ${careType}</p>
                </div>
                <p style="text-align: center;">
                  <a href="${appUrl}/dashboard/carer/jobs" class="button">View Opportunity</a>
                </p>
                <p>Log in to your dashboard to view full details and apply for this position.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to send match notification:', error);
        return { success: false, error };
    }
}

/**
 * Send welcome email after verification
 */
export async function sendWelcomeEmail(
    email: string,
    name: string,
    role: 'family' | 'carer'
) {
    const dashboardUrl = `${appUrl}/dashboard/${role}`;

    try {
        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: 'Welcome to MeddyCare!',
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to MeddyCare! 🎉</h1>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                <p>Your email has been verified successfully! You're all set to start using MeddyCare.</p>
                ${role === 'family' ? `
                  <p>As a family member, you can now:</p>
                  <ul>
                    <li>Create care requests</li>
                    <li>Browse and match with qualified carers</li>
                    <li>Manage care plans and health records</li>
                    <li>Track care logs and reports</li>
                  </ul>
                ` : `
                  <p>As a carer, you can now:</p>
                  <ul>
                    <li>Browse available care opportunities</li>
                    <li>Apply for positions that match your skills</li>
                    <li>Manage your profile and qualifications</li>
                    <li>Track your earnings and placements</li>
                  </ul>
                `}
                <p style="text-align: center;">
                  <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
                </p>
                <p>If you have any questions, feel free to reach out to our support team.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to send welcome email:', error);
        return { success: false, error };
    }
}
