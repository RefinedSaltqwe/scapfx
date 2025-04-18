import { DownloadLinkEmailTemplate } from "@/components/Email/DownloadLink";
import { ForgotPasswordEmailTemplate } from "@/components/Email/ForgotPassword";
import { NewsletterSuccessEmailTemplate } from "@/components/Email/Newsletter";
import { env } from "@/env";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(req: Request) {
  const items = (await req.json()) as {
    what: string;
    email: string;
    name: string;
    id: string;
  };

  let template;
  let emailSubject = "";

  switch (items.what) {
    case "checkout_success":
      emailSubject = "Purchase Download Link(s)";
      template = DownloadLinkEmailTemplate({
        name: items.name,
        session_id: items.id,
      });
      break;
    case "forgot_password":
      emailSubject = "Reset Your Password Request";
      template = ForgotPasswordEmailTemplate({
        name: items.name,
        email: items.email,
        forgot_password_id: items.id,
      });
      break;
    case "newsletter":
      emailSubject =
        "You've Already Subscribed! Here's Your Free Preset & Discount Code";
      template = NewsletterSuccessEmailTemplate({
        name: items.name,
        discountCode: items.id,
        url: `${env.NEXT_PUBLIC_API_URL}/free-preset?email=${items.email}`,
      });
      break;
    default:
      return NextResponse.json(
        { error: "Invalid request type" },
        { status: 400 },
      );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Scap Creative <no-reply@scapcreative.com>",
      to: [items.email],
      subject: emailSubject,
      react: template,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to send email: " },
        { status: 500 },
      );
    }
  }
}
