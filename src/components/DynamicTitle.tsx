import Head from "next/head";

interface DynamicTitleProps {
  title: string;
}

const DynamicTitle: React.FC<DynamicTitleProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default DynamicTitle;
