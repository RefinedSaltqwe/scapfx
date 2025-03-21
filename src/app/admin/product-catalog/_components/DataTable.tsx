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
import { useCallback, useState } from "react";
import { DataTableFilters } from "./DataTableFilters";

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
  // const { execute, isLoading } = useAction(deleteService, {
  //   onSuccess: () => {
  //     toast.success(
  //       `${
  //         modalIds?.length && modalIds?.length > 1
  //           ? "Services have"
  //           : "Service has"
  //       } been deleted.`,
  //     );
  //     void queryClient.invalidateQueries({
  //       queryKey: ["serviceTypes", agencyId],
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error(error, {
  //       duration: 5000,
  //     });
  //   },
  //   onComplete: () => {
  //     setRowSelection([]);
  //     onIsProceed(false);
  //     onClose();
  //   },
  // });

  const searchFilter = useCallback(
    (val: string) => {
      setGlobalFilterString(val);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalFilterString],
  );
  // const deleteSelecetedUsers = () => {
  //   const getUsers = extractRowIds(
  //     extractTableIndex(rowSelection),
  //     serviceType,
  //   );
  //   serviceModal.onOpen(getUsers, "serviceType");
  // };

  // useEffect(() => {
  //   if (isProceed) {
  //     void execute({
  //       ids: modalIds!,
  //     });
  //   } else {
  //     return;
  //   }
  // }, [isProceed]);

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
      <div className="border-b-[1px] border-b-slate-200 dark:border-b-slate-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn(
                  "border-b-slate-200 bg-slate-100/80 dark:border-b-slate-700 dark:bg-slate-500/20 dark:hover:bg-slate-500/20",
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
                          onClick={() => null}
                          variant={"ghost"}
                          size={"sm"}
                          className="hover:bg-primary/20 rounded-full"
                          // disabled={isLoading}
                        >
                          {false ? (
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
                    className="border-b-slate-200 dark:border-b-slate-700"
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
