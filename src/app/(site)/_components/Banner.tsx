import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="bg-primary flex items-center justify-center px-8 py-1 sm:px-3.5">
      <div className="flex flex-col items-center justify-center text-sm/6 text-white">
        <span className="text-center uppercase">
          {`Presets Are Powerful—With the Right Process.`}
        </span>
        {/* <span className="flex text-center uppercase md:hidden">{`Ends soon. Don't miss out.`}</span> */}
      </div>
    </div>
  );
};
export default Banner;
