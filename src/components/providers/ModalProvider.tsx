import React, { lazy } from "react";
const CartDialog = lazy(
  () => import("@/app/(site)/_components/modal/CartDialog"),
);
const DeleteManyModal = lazy(() => import("../modal/DeleteManyModal"));

const ModalProvider: React.FC = () => {
  return (
    <>
      <CartDialog />
      <DeleteManyModal />
    </>
  );
};
export default ModalProvider;
