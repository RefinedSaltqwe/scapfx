import React, { lazy, Suspense } from "react";
const CartDialog = lazy(
  () => import("@/app/(site)/_components/modal/CartDialog"),
);
const DeleteManyModal = lazy(() => import("../modal/DeleteManyModal"));

const ModalProvider: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartDialog />
      <DeleteManyModal />
    </Suspense>
  );
};
export default ModalProvider;
