import React from "react";
import AccountPageContents from "../../_components/AccountPageContents";

type AccountPageProps = {
  params: {
    userId: string;
  };
};

const AccountPage: React.FC<AccountPageProps> = ({ params }) => {
  return (
    <>
      <AccountPageContents />
    </>
  );
};
export default AccountPage;
