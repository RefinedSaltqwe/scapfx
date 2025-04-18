import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-red-600 px-8 py-1 sm:px-3.5">
      <div className="flex flex-col items-center justify-center text-sm/6 text-white">
        <span className="text-center font-bold uppercase sm:text-xl">
          FLASH SALE • 85% OFF • ENDS TONIGHT
        </span>
        {/* <span className="flex text-center uppercase md:hidden">{`Ends soon. Don't miss out.`}</span> */}
      </div>
    </div>
  );
};
export default Banner;
