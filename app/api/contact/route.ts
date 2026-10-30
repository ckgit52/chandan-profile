import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

const limiter = createRateLimiter(5, 60 * 60_000);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const senderName = name.replace(/[\r\n]+/g, " ").trim();
    const senderEmail = email.trim();
    const text = message.trim();

    if (
      senderName.length < 2 ||
      senderName.length > 100 ||
      senderEmail.length > 254 ||
      !EMAIL_PATTERN.test(senderEmail) ||
      text.length < 10 ||
      text.length > 5000
    ) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!limiter(clientIp(req))) {
      return NextResponse.json({ success: false }, { status: 429 });
    }

    const { EMAIL_USER, EMAIL_PASS } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error(
        "Contact route: EMAIL_USER / EMAIL_PASS are not configured",
      );
      return NextResponse.json({ success: false }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    // Gmail only sends as the authenticated account, so the visitor goes in
    // replyTo and hitting "Reply" still reaches them.
    await transporter.sendMail({
      from: { name: senderName, address: EMAIL_USER },
      replyTo: { name: senderName, address: senderEmail },
      to: EMAIL_USER,
      subject: `Portfolio Contact from ${senderName}`,
      text: `Name: ${senderName}\nEmail: ${senderEmail}\n\n${text}`,
      html: `
        <h3>Portfolio Enquiry (Contact Form)</h3>
        <p><strong>Name:</strong> ${escapeHtml(senderName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(senderEmail)}</p>
        <p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
