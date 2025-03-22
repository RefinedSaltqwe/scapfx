"use client";

import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type Preset } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Preset>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className={cn(
          "font-normal placeholder:text-gray-400 dark:placeholder:text-gray-600",
          "splash-base-input splash-inputs",
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
        <span
          onClick={() =>
            console.log("Columns.tsx: line 97: ", row.getValue("id"))
          }
          className="min-w-[1000px] text-left font-medium capitalize hover:cursor-pointer hover:underline"
        >
          {data.name}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
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
            onClick={() => null}
          >
            <Trash2 className="text-destructive" size={20} />
          </Button>
        </div>
      );
    },
  },
];
