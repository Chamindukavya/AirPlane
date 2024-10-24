"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormLabel } from "@/components/ui/form";
import { useEffect } from "react";

export default function DateRangePicker() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch graph data based on the selected route
  async function fetchData() {
    const res = await fetch("/api/getPassengersData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flightschedule_id: "1" }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  }

  return (
    <div className={cn("grid gap-2 m-[-120px] ")}>
      <p className="text-xs">Date Range</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal text-xs",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 text-xs" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button
        className="text-xs"
        onClick={() => {
          if (date?.from && date?.to) {
            console.log(format(date.from, "yyyy-MM-dd"));
            console.log(format(date.to, "yyyy-MM-dd"));
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
}
