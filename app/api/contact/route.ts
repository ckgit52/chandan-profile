import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env?.EMAIL_USER,
        pass: process.env?.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env?.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h3>Portfolio Enquiry (Contact Form)</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
