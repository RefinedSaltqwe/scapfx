import React from "react";

type HeadingProps = {
  title: string;
  subTitle?: string;
};

const Heading: React.FC<HeadingProps> = ({ title, subTitle }) => {
  return (
    <div className="mb-5 flex w-full flex-col gap-y-1 py-3">
      <h1 className="text-foreground text-2xl font-bold">{title}</h1>
      <span className="text-normal text-muted-foreground font-normal">
        {subTitle}
      </span>
    </div>
  );
};
export default Heading;
