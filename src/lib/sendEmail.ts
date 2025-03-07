import { env } from "@/env";

export const sendEmail = async (
  what: string,
  name: string,
  email: string,
  session_id?: string,
) => {
  let emailBody;
  switch (what) {
    case "checkout_success":
      emailBody = JSON.stringify({ email, name, session_id });
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
