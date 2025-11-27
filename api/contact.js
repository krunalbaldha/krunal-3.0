// api/contact.js (Vercel Serverless Function using Nodemailer)

const nodemailer = require('nodemailer');

// 🛑 IMPORTANT: Replace this with the final email address where you want to receive contact details
const RECEIVER_EMAIL = 'krunalbaldha1@gmail.com'; 
// 🛑 IMPORTANT: Replace this with the verified email address linked to your SMTP credentials
const SENDER_EMAIL = process.env.SMTP_USER; 

// Configure the Nodemailer transporter using Environment Variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10), // Default to 587
  secure: false, // Use false for port 587 (STARTTLS), true for port 465 (TLS)
  auth: {
    user: SENDER_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Input validation (basic check)
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const mailOptions = {
      from: `"${name}" <${SENDER_EMAIL}>`, // Sender is the authenticated user, but display name is the form user
      to: RECEIVER_EMAIL, // Where the form details should go
      replyTo: email, // Set the user's email for easy reply
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <html>
        <body style="font-family: sans-serif; line-height: 1.6;">
            <p>You have received a new contact form submission from your portfolio website.</p>
            <hr>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="border-left: 3px solid #06B6D4; padding-left: 10px; margin: 15px 0; background-color: #f4f4f4; padding: 15px;">
                ${message.replace(/\n/g, '<br>')}
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    // Success response
    res.status(200).json({ message: 'Email sent successfully via Nodemailer!' });

  } catch (error) {
    console.error('Nodemailer Error:', error);
    // Provide a generic 500 error to the client
    res.status(500).json({ error: 'Failed to send email. Check server logs.' });
  }
}