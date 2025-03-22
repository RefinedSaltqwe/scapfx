import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useDeleteManyModal } from "@/hooks/stores/useDeleteManyModal";
import { redirect } from "next/navigation";
import { type Preset } from "@prisma/client";

const CellActionButtons = ({ item }: { item: Preset }) => {
  const deletePresetModal = useDeleteManyModal();

  return (
    <div className="text-muted-foreground flex flex-row justify-end space-x-1">
      <Button
        variant="ghost"
        className="hover:!bg-muted-foreground/20 rounded-md"
        size={"icon"}
        onClick={() => redirect(`/admin/product-catalog/update/${item.id}`)}
      >
        <Pencil size={20} />
      </Button>
      <Button
        variant="ghost"
        size={"icon"}
        className="hover:!bg-destructive/20 rounded-md"
        onClick={() => deletePresetModal.onOpen([item.id], "preset")} // Use the modal here
      >
        <Trash2 className="text-destructive" size={20} />
      </Button>
    </div>
  );
};

export default CellActionButtons;
