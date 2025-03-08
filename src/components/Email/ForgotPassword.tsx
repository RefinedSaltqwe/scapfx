import * as React from "react";

export interface ForgotPasswordEmailTemplateProps {
  name: string;
  email: string;
  forgot_password_id: string;
}

export const ForgotPasswordEmailTemplate: React.FC<
  Readonly<ForgotPasswordEmailTemplateProps>
> = ({ name, email, forgot_password_id }) => (
  <div
    style={{ fontFamily: "Arial, sans-serif", color: "#333", padding: "20px" }}
  >
    <h2 style={{ color: "#000" }}>{`Reset Your Password`}</h2>
    <p>Dear {name},</p>
    <p>
      {`We received a request to reset your password. To proceed, please click the link below to reset your password.`}
    </p>
    <p>
      <strong>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/forgot-password/verified?email=${email}&FPassId=${forgot_password_id}`}
          style={{
            backgroundColor: "#000000",
            color: "#fff",
            padding: "10px 15px",
            textDecoration: "none",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          Reset Your Password
        </a>
      </strong>
    </p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>
      If you have any issues, feel free to contact us at{" "}
      <a href="mailto:scapcreative@gmail.com">scapcreative@gmail.com</a>.
    </p>
    <p>Best regards,</p>
    <p>
      <strong>Scap Creative Team</strong>
    </p>
    <p>
      <a href="https://scapcreative.com">scapcreative.com</a>
    </p>
  </div>
);
