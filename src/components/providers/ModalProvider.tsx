import React, { lazy } from "react";
const CartDialog = lazy(
  () => import("@/app/(site)/_components/modal/CartDialog"),
);

const ModalProvider: React.FC = () => {
  return (
    <>
      <CartDialog />
    </>
  );
};
export default ModalProvider;
