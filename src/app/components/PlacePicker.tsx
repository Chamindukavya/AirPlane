"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

export default function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [airports, setAirports] = React.useState<{ airport_code: string }[]>(
    []
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getAirports/");
        const data = await response.json();

        console.log("API Response:", data); // Log the full response

        // Make sure you check the response structure here
        if (Array.isArray(data.airports)) {
          setAirports(data.airports);
        } else {
          console.error("Expected an array but received:", data);
          setAirports([]); // Ensure airports is always an array
        }
      } catch (err) {
        console.error("Error fetching airports", err);
        setAirports([]); // Ensure airports is always an array
      }
    }
    fetchData();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between text-xs"
        >
          {value
            ? airports.find((airport) => airport.airport_code === value)
                ?.airport_code
            : "Select airport..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0 text-xs">
        <Command className="text-xs">
          <CommandInput placeholder="Search airport..." />
          <CommandList>
            <CommandEmpty className="text-xs">No airport found.</CommandEmpty>
            <CommandGroup>
              {airports.map((airport) => (
                <CommandItem
                  key={airport.airport_code}
                  value={airport.airport_code}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === airport.airport_code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {airport.airport_code}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
