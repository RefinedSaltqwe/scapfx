import { redirect } from "next/navigation";
import React from "react";

type HomeProps = {
  a?: string;
};

const Home: React.FC<HomeProps> = () => {
  redirect("/shop/aether");
  return <div>Nothing here</div>;
};
export default Home;
