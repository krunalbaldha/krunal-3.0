// api/contact.js (Vercel Serverless Function - Node.js)

const sgMail = require('@sendgrid/mail');

// 🛑 IMPORTANT: Your SendGrid API Key MUST be set as an Environment Variable
// (e.g., SENDGRID_API_KEY) in your Vercel project dashboard.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// 🛑 IMPORTANT: Replace these placeholders with your actual emails:
const INBOUND_PARSE_EMAIL = 'receiver-address@your-domain.com'; 
const SENDER_EMAIL = 'verified-sender@your-domain.com'; // Must be a SendGrid verified sender

export default async function handler(req, res) {
  // Enforce POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const msg = {
      to: INBOUND_PARSE_EMAIL, 
      from: SENDER_EMAIL, 
      subject: `New Contact Form Submission from ${name} (${email})`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Message:</strong> <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email, // Set the user's email for easy reply
    };

    await sgMail.send(msg);
    
    // Success response
    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('SendGrid API Error:', error.response ? error.response.body : error);
    res.status(500).json({ error: 'Failed to send email via SendGrid.' });
  }
}