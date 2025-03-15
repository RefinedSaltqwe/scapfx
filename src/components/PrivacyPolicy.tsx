import Link from "next/link";
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 text-gray-800">
      <h1 className="text-center text-3xl font-bold">Privacy Policy</h1>

      <section>
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p>
          {`Welcome to ScapCreative ("we," "our," or "us"). This Privacy Policy explains how we collect, use, and protect your personal information when you purchase and use our digital Lightroom presets ("Presets").`}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Information We Collect</h2>
        <p>We collect the following information:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Email Address</strong>: Used for order fulfillment and
            product tracking.
          </li>
          <li>
            <strong>Name</strong>: To personalize your order and provide
            customer support.
          </li>
          <li>
            <strong>Purchase Details</strong>
            {`: Records of the presets you've
            purchased.`}
          </li>
        </ul>
        <p>
          We do <strong>not</strong> collect, store, or process any credit card
          or payment information.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Payment Processing</h2>
        <p>
          All payments are securely processed through <strong>Stripe</strong>.
          We do <strong>not</strong> have access to your payment details.
        </p>
        <p>
          Stripe collects and processes your payment information in accordance
          with its{" "}
          <Link
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          4. How We Use Your Information
        </h2>
        <p>We use your email address and name for:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>Order confirmation and delivery.</li>
          <li>Providing customer support.</li>
          <li>Notifying you about updates to your purchased presets.</li>
        </ul>
        <p>
          We do <strong>not</strong> send marketing emails unless you opt-in.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Data Protection & Security</h2>
        <p>
          We implement security measures to protect your personal information.
          However, no method of transmission over the Internet is 100% secure.
          By using our services, you acknowledge that you share your information
          at your own risk.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Third-Party Services</h2>
        <p>
          We may use third-party services like Stripe to process payments. These
          third parties have their own privacy policies, and we encourage you to
          review them.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>Request access to the personal data we store.</li>
          <li>Request deletion of your data.</li>
          <li>Opt-out of receiving emails.</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <Link
            href="mailto:scapcreative@gmail.com"
            className="font-medium underline"
          >
            scapcreative@gmail.com
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time. The
          latest version will be posted on this page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <Link
            href="mailto:scapcreative@gmail.com"
            className="font-medium underline"
          >
            scapcreative@gmail.com
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
