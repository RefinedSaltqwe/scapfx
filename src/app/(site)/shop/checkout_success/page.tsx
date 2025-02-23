import React from "react";

type SuccessStripePageProps = {
  s?: string;
};

const SuccessStripePage: React.FC<SuccessStripePageProps> = () => {
  return (
    <div className="flex h-full w-full p-32 text-9xl text-amber-800">
      Success!!
    </div>
  );
};
export default SuccessStripePage;
