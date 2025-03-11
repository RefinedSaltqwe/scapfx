import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 text-gray-800">
      <h1 className="text-center text-3xl font-bold">Terms and Conditions</h1>

      <section>
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p>
          {`Welcome to ScapCreative ("we," "our," or "us"). These Terms and
          Conditions govern the sale and use of our digital Lightroom presets
          ("Presets"). By purchasing, downloading, or using our Presets, you
          agree to be bound by these Terms.`}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Digital Product Policy</h2>
        <p>
          All our products are digital and do not require shipping. Due to the
          nature of digital products, <strong>all sales are final</strong>, and
          we do not offer refunds, returns, or exchanges under any
          circumstances.
        </p>
        <p>
          <strong>
            If you accidentally purchase duplicate Presets, we do not offer
            refunds. Please review your order carefully before completing your
            purchase.
          </strong>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. License and Usage</h2>
        <p>When you purchase a Preset, you are granted a:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>Non-exclusive, non-transferable, single-user license.</li>
          <li>Use for personal or commercial purposes.</li>
        </ul>
        <p>
          You may <strong>not</strong>:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Resell, share, distribute, or transfer the Preset.</li>
          <li>Modify and claim the Preset as your own.</li>
          <li>Use the Preset in a way that competes with our business.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Compatibility and Support</h2>
        <p>
          {`Our Presets are designed for Adobe Lightroom and are provided "as
          is." We do not guarantee compatibility with all versions of Lightroom
          or devices. If you experience technical issues, we offer basic
          support but cannot guarantee troubleshooting beyond our provided
          guidelines.`}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          5. Intellectual Property Rights
        </h2>
        <p>
          All Presets are the intellectual property of ScapCreative and are
          protected by copyright laws. Purchasing a Preset does not grant
          ownership rights—only a license to use it as outlined in these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Liability Disclaimer</h2>
        <p>
          We are not responsible for any direct, indirect, or incidental damages
          resulting from the use or inability to use our Presets. You agree to
          use them at your own risk.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Changes to These Terms</h2>
        <p>
          We reserve the right to modify or update these Terms at any time
          without prior notice. It is your responsibility to review them
          periodically.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">8. Contact Information</h2>
        <p>
          If you have any questions regarding these Terms, please contact us at
          scapcreative@gmail.com.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
