import * as React from "react";

export interface NewsletterSuccessEmailTemplateProps {
  name: string;
  discountCode: string;
  url: string;
}

export const NewsletterSuccessEmailTemplate: React.FC<
  Readonly<NewsletterSuccessEmailTemplateProps>
> = ({ discountCode, url }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      color: "#333",
      padding: "20px",
    }}
  >
    <h2 style={{ color: "#000" }}>{`Thank you for subscribing!`}</h2>
    <p>
      {`As a thank you, here's a special offer for you: Use the code `}
      <strong>{discountCode}</strong>{" "}
      {` to get a discount on your next purchase!`}
    </p>
    <p>{`And as promised, here’s your free preset download link:`}</p>
    <p>
      <a
        href={url}
        style={{
          backgroundColor: "#000000",
          color: "#fff",
          padding: "10px 15px",
          textDecoration: "none",
          borderRadius: "5px",
          display: "inline-block",
        }}
      >
        Download Your Free Preset
      </a>
    </p>
    <p>
      {`Thank you for being part of Scap Creative! If you have any questions, feel free to contact us at `}
      <a href="mailto:scapcreative@gmail.com">scapcreative@gmail.com</a>.
    </p>
    <p>
      Best regards,
      <br />
      <strong>Scap Creative Team</strong>
    </p>
    <p>
      <a href="https://scapcreative.com">scapcreative.com</a>
    </p>
  </div>
);
