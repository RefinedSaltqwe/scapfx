"use client";

import { useEffect } from "react";
import Head from "next/head";

interface DynamicTitleProps {
  title: string;
}

const DynamicTitle: React.FC<DynamicTitleProps> = ({ title }) => {
  useEffect(() => {
    document.title = title; // Updates browser tab title
  }, [title]);

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default DynamicTitle;
