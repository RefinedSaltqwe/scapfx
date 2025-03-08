import { env } from "@/env";

export const sendEmail = async (
  what: string,
  email: string,
  name: string,
  session_id?: string,
  forgot_password_id?: string | null,
) => {
  let emailBody;
  switch (what) {
    case "checkout_success":
      emailBody = JSON.stringify({ what, email, name, id: session_id });
      break;
    case "forgot_password":
      emailBody = JSON.stringify({ what, email, name, id: forgot_password_id });
      break;
  }
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: emailBody,
    });

    const data = (await res.json()) as {
      success: boolean;
      data: { id: string };
    };
    return data.success;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
