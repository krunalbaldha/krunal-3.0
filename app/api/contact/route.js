import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP Connected ✅");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: "krunalbaldha1@gmail.com",
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Email Error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to send email",
      }),
      { status: 500 }
    );
  }
}
