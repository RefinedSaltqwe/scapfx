"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import Loader from "@/components/Loader";
import { DataTablePagination } from "@/components/datatable/DataTablePagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type Preset } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DataTableFilters } from "./DataTableFilters";
import { useAction } from "@/hooks/useSafeAction";
import { deletePresets } from "@/server/actions/delete-presets";
import { toast } from "sonner";
import { useDeleteManyModal } from "@/hooks/stores/useDeleteManyModal";
import { usePresets } from "@/hooks/stores/usePresets";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  presets: Preset[];
}

const extractTableIndex = (data: object) => {
  const inputObject = data;
  // Extract keys
  const keysArray = Object.keys(inputObject);
  const keysAsNumbersArray = keysArray.map(Number);
  return keysAsNumbersArray;
};

const extractRowIds = (rows: number[], users: Preset[]) => {
  const data = users;
  const extract: string[] = []; // Initialize extract as an empty array
  data.forEach((value, index) => {
    if (rows.includes(index)) {
      extract.push(value.id);
    }
  });
  return extract;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  presets,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilterString, setGlobalFilterString] = useState("");
  const modalIds = useDeleteManyModal((state) => state.modalIds);
  const isProceed = useDeleteManyModal((state) => state.proceed);
  const onIsProceed = useDeleteManyModal((state) => state.onIsProceed);
  const onClose = useDeleteManyModal((state) => state.onClose);
  const presetModal = useDeleteManyModal();
  const removePresets = usePresets((state) => state.removePresets);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        id: false,
        ...columnVisibility,
      },
      rowSelection,
      globalFilter: globalFilterString,
    },
  });

  const queryClient = useQueryClient();
  const { execute: executeDeletePresets, isLoading } = useAction(
    deletePresets,
    {
      onSuccess: () => {
        toast.success(
          `${
            modalIds?.length && modalIds?.length > 1
              ? "Presets have"
              : "Preset has"
          } been deleted.`,
        );
        if (modalIds?.length && modalIds?.length > 0) {
          removePresets(modalIds);
        }
        void queryClient.invalidateQueries({
          queryKey: ["all_presets"],
        });
      },
      onError: (error) => {
        toast.error(error, {
          duration: 5000,
        });
      },
      onComplete: () => {
        setRowSelection([]);
        onIsProceed(false);
        onClose();
      },
    },
  );

  const searchFilter = useCallback(
    (val: string) => {
      setGlobalFilterString(val);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalFilterString],
  );
  const deleteSelecetedPresets = () => {
    const getPresets = extractRowIds(extractTableIndex(rowSelection), presets);
    presetModal.onOpen(getPresets, "preset");
  };

  useEffect(() => {
    if (isProceed) {
      void executeDeletePresets({
        ids: modalIds!,
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProceed]);

  return (
    <div className="flex w-full flex-col pt-4 pb-6">
      {/* Header */}
      <div className="flex w-full items-center px-5 py-4">
        {/* Filters */}
        <DataTableFilters
          table={table}
          globalFilterString={globalFilterString}
          searchFilter={searchFilter}
        />
      </div>
      {/* Data Table */}
      <div className="border-muted-foreground/20 border-b-[1px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn(
                  "border-b-muted-foreground/20 bg-muted/80",
                  extractTableIndex(rowSelection).length > 0 &&
                    "!bg-primary/30",
                )}
              >
                {headerGroup.headers.map((header, index) => {
                  const selectedRowsLength =
                    extractTableIndex(rowSelection).length;
                  if (
                    (index === 0 && selectedRowsLength > 0) ||
                    selectedRowsLength === 0
                  ) {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  } else if (
                    index === headerGroup.headers.length - 1 &&
                    selectedRowsLength !== 0
                  ) {
                    return (
                      <TableHead key={header.id} className="text-right">
                        <Button
                          onClick={deleteSelecetedPresets}
                          variant={"ghost"}
                          size={"sm"}
                          className="hover:bg-primary/20 rounded-md"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader classNames="h-4 w-4 border-2 border-primary brightness-100 saturate-200 border-r-transparent" />
                          ) : (
                            <Trash2
                              size={16}
                              className="text-primary brightness-100 saturate-200"
                            />
                          )}
                        </Button>
                      </TableHead>
                    );
                  } else {
                    return <TableHead key={header.id}></TableHead>;
                  }
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b-muted-foreground/20"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination and Rows Selected*/}
      <DataTablePagination table={table} />
    </div>
  );
}
