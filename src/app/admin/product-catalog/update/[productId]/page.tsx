import Heading from "@/app/admin/components/Heading";
import React from "react";
import PresetForm from "../../_components/Forms/Preset";

type UpdateInvoiceProps = {
  params: {
    productId: string;
  };
};

export const dynamic = "force-dynamic";

const UpdateInvoicePage: React.FC<UpdateInvoiceProps> = async ({ params }) => {
  return (
    <section className="flex w-full flex-col">
      <Heading title={"Preset Name Here"} subTitle="Update preset" />
      <PresetForm type="update" productId={params.productId} />
    </section>
  );
};
export default UpdateInvoicePage;
