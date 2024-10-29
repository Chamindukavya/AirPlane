"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

// New data structure

// Define the types based on the new data structure
export type PassengerDetails = {
  name: string;
  age: number;
  dob: string;
  seat_id: number;
  passport_num: number;
  class: string;
};

// Update the column definitions
export const columns: ColumnDef<PassengerDetails>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">Name</div>,
    cell: ({ row }) => {
      const age = row.getValue("name") as number;

      return <div className="text-center">{age}</div>;
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("age")}</div>
    ),
  },
  {
    accessorKey: "dob",
    header: () => <div className="text-right">Birthday</div>,

    cell: ({ row }) => {
      const dob = row.getValue("dob") as number;

      return <div className="text-right font-medium">{dob}</div>;
    },
  },
  {
    accessorKey: "seat_id",
    header: () => <div className="text-right">Seat No.</div>,
    cell: ({ row }) => {
      const seat_id = row.getValue("seat_id") as number;

      return <div className="text-right font-medium">{seat_id}</div>;
    },
  },
  {
    accessorKey: "passport_num",
    header: () => <div className="text-right">Passport No.</div>,
    cell: ({ row }) => {
      const passport_num = row.getValue("passport_num") as number;

      return <div className="text-right font-medium">{passport_num}</div>;
    },
  },
  {
    accessorKey: "class",
    header: () => <div className="text-right">Class</div>,
    cell: ({ row }) => {
      const class$ = row.getValue("class") as number;

      return <div className="text-right font-medium">{class$}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const passenger = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              onClick={() => navigator.clipboard.writeText(passenger.name)}
            >
              Copy destination airport
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DestinationTable({ routeId }: { routeId: number }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [data, setData] = useState<PassengerDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Start loading
    fetchData();
  }, [routeId]);

  // Function to fetch graph data based on the selected route
  async function fetchData() {
    try {
      const res = await fetch("/api/getPassengerWithAge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flightSchedule_id: routeId }),
      });
      const data = await res.json();
      setData(data.passengerDetails || []);
      console.log("passenger count", data.passengerDetails[0]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  if (loading) {
    return <div text-center>Loading...</div>;
  }

  return (
    <div className="w-full">
      <h3 className="font-semibold mt-2 ml-2">
        Passenger Details of Upcoming Flight
      </h3>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by Passport Number..."
          value={
            (table.getColumn("passport_num")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("passport_num")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
