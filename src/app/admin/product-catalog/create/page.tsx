import React from "react";
import PresetForm from "../_components/Forms/Preset";

export const dynamic = "force-dynamic";

const CreatePresetPage: React.FC = async () => {
  return (
    <section className="flex w-full flex-col">
      <PresetForm type="create" />
    </section>
  );
};
export default CreatePresetPage;
