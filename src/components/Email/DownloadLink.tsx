import * as React from "react";

export interface DownloadLinkEmailTemplateProps {
  name: string;
  session_id: string;
}

export const DownloadLinkEmailTemplate: React.FC<
  Readonly<DownloadLinkEmailTemplateProps>
> = ({ name, session_id }) => (
  <div
    style={{ fontFamily: "Arial, sans-serif", color: "#333", padding: "20px" }}
  >
    <h2
      style={{ color: "#000" }}
    >{`Your download link for your purchased preset(s)`}</h2>
    <p>Dear {name},</p>
    <p>
      {`Thank you for your purchase! We're excited for you to start using our presets.`}
    </p>
    <p>
      <strong>
        <a
          href={`https://www.scapcreative.com/shop/checkout_success?session_id=${session_id}`}
          style={{
            backgroundColor: "#000000",
            color: "#fff",
            padding: "10px 15px",
            textDecoration: "none",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          Download Here
        </a>
      </strong>
    </p>
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
