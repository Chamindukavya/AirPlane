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

interface DateRangePickerProps {
  onDateSelect: (from: string, to: string, graph: number) => void; // Add this prop to pass selected dates
}

export default function DateRangePicker({
  onDateSelect,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2025, 0, 1), 30),
  });

  return (
    <div className={cn("grid grid-cols-3 gap-4 items-center mt-1 mb-[-25px]")}>
      {/* Column 1: Title */}
      <div>
        <p className="text-xs font-medium">Date Range</p>
      </div>

      {/* Column 2: Popover with Date Range Picker */}
      <div className="ml-[-110px]">
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
      </div>

      {/* Column 3: Submit Button */}
      <div>
        <Button
          className="text-xs"
          onClick={() => {
            if (date?.from && date?.to) {
              onDateSelect(
                format(date.from, "yyyy-MM-dd"),
                format(date.to, "yyyy-MM-dd"),
                6
              ); // Pass selected dates to parent
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
