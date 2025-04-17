import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-red-600 px-8 py-2.5 sm:px-3.5">
      <div className="flex flex-col items-center justify-center text-sm/6 text-white">
        <span className="flex text-xl font-bold md:hidden">
          SPRING SALE – UP TO 70% OFF!
        </span>
        <span className="hidden text-xl font-bold md:flex">
          SPRING SALE • UP TO 70% OFF • ENDS SOON
        </span>
        <span className="flex md:hidden">{`Ends soon. Grab your presets now before they're gone.`}</span>
      </div>
    </div>
  );
};
export default Banner;
