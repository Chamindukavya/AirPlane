import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface PassengerCounts {
  frequent_count: number;
  gold_count: number;
}
export default function BookingTable({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  const [count, setCount] = useState<PassengerCounts[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/getBookingCounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fromDate: fromDate, toDate: toDate }),
        });
        const data = await res.json();
        setCount(data.PassengerCounts);
        console.log(data.PassengerCounts);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, [fromDate, toDate]); // Dependencies array
  return (
    <Table>
      <TableCaption className="text-center">{}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>passenger type</TableHead>
          <TableHead className="text-right">counts</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className=" font-medium">frequent passengers</TableCell>
          <TableCell className="text-right">
            {count[0] && count[0].frequent_count}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className=" font-medium">gold passengers</TableCell>
          <TableCell className="text-right">
            {count[0] && count[0].gold_count}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className=" font-medium" colSpan={1}>
            Total
          </TableCell>
          <TableCell className="text-right">
            {count[0] &&
              Number(count[0].frequent_count) + Number(count[0].gold_count)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
