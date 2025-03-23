"use client";

import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type Preset } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import CellActionButtons from "./CellActionButtons";
import { QuickEditModal } from "@/components/modal/QuickEditModal";

export const columns: ColumnDef<Preset>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className={cn(
          "font-normal placeholder:text-gray-400 dark:placeholder:text-gray-600",
        )}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className={cn(
          "font-normal placeholder:text-gray-400 dark:placeholder:text-gray-600",
          "splash-base-input splash-inputs",
        )}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <QuickEditModal
          data={{ name: data.name, id: data.id, productId: data.productId }}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return <CellActionButtons item={item} />;
    },
  },
];
