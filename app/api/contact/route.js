import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// 1. Configure the Nodemailer transporter (using environment variables)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // Use true if port is 465 (SSL), false otherwise
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 2. Define the POST handler for the Route
export async function POST(request) {
  try {
    // A. Parse the JSON body from the incoming request
    const { name, email, message } = await request.json();

    // B. Basic server-side validation (optional, but good practice)
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }
    
    // C. Define the email content
    const mailOptions = {
      from: process.env.SMTP_USER, // The sender email (must be the same as the user in auth)
      to: "krunalbaldha1@gmail.com", // ⬅️ Replace with your actual receiving email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>Portfolio Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; border: 1px solid #ccc; padding: 10px;">${message}</p>
      `,
    };

    // D. Send the email
    await transporter.sendMail(mailOptions);

    // E. Return a success response
    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Nodemailer Error:', error);

    // F. Return an error response
    return NextResponse.json(
      { success: false, message: 'Failed to send message.', error: error.message },
      { status: 500 }
    );
  }
}