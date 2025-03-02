import { DownloadLinkEmailTemplate } from "@/components/Email/DownloadLink";
import { env } from "@/env";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(req: Request) {
  const items = (await req.json()) as {
    name: string;
    session_id: string;
    email: string;
  };

  try {
    const { data, error } = await resend.emails.send({
      from: "Scap Creative <support@scapcreative.com>",
      to: [items.email],
      subject: "Scap Creative Purchase Download Link",
      react: DownloadLinkEmailTemplate({
        name: items.name,
        session_id: items.session_id,
      }),
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
