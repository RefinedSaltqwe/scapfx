import React from "react";
import Heading from "../_components/Heading";

const ChatPage: React.FC = () => {
  return (
    <section className="flex w-full flex-col">
      <div className="mb-5 flex items-center justify-between">
        <Heading title="Chat" subTitle="Chat support" />
      </div>
    </section>
  );
};
export default ChatPage;
