import React from "react";

const LicenseAgreement: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 text-gray-800">
      <h1 className="text-center text-3xl font-bold">Licence Agreement</h1>

      <section>
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p>
          {`This Licence Agreement ("Agreement") is a legal contract between you
          ("User") and ScapCreative ("we," "our," or "us") governing the use of
          our digital Lightroom presets ("Presets"). By purchasing, downloading,
          or using our Presets, you agree to comply with the terms of this
          Agreement.`}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Licence Grant</h2>
        <p>Upon purchase, we grant you a:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>Non-exclusive, non-transferable, single-user licence.</li>
          <li>
            Permission to use the Presets for personal and commercial projects.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Restrictions</h2>
        <p>
          You <strong>may not</strong>:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Resell, share, distribute, or transfer the Presets to others.</li>
          <li>
            Modify, claim ownership, or create derivative works from the
            Presets.
          </li>
          <li>Use the Presets in any way that competes with ScapCreative.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Digital Product Policy</h2>
        <p>
          All Presets are digital products. As such,{" "}
          <strong>all sales are final</strong>, and no refunds, exchanges, or
          returns will be provided.
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
        <h2 className="text-xl font-semibold">5. Compatibility & Support</h2>
        <p>
          {`Our Presets are designed for Adobe Lightroom and are provided "as is."
          We do not guarantee compatibility with all Lightroom versions or
          devices. Basic support is available, but we cannot guarantee
          troubleshooting beyond our provided guidelines.`}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Intellectual Property</h2>
        <p>
          All Presets remain the intellectual property of ScapCreative and are
          protected by copyright laws. Purchasing a Preset grants a licence to
          use it but does not transfer ownership.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Liability Disclaimer</h2>
        <p>
          ScapCreative is not responsible for any direct, indirect, or
          incidental damages resulting from the use or inability to use our
          Presets. The User assumes all risks related to their use.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          8. Modifications to This Agreement
        </h2>
        <p>
          We reserve the right to update or modify this Licence Agreement at any
          time without prior notice. Users are responsible for reviewing the
          latest version periodically.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">9. Contact Information</h2>
        <p>
          If you have any questions regarding this Licence Agreement, please
          contact us at <strong>scapcreative@gmail.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default LicenseAgreement;
