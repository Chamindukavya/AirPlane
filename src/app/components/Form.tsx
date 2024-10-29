import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { z } from "zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

// Schema validation for the form using Zod
const FormSchema = z.object({
  route: z.string({
    required_error: "Please select a route.",
  }),
});

interface RoutesSep {
  flightschedule_id: number;
  origin: string;
  destination: string;
  date: string;
}

interface ComboboxFormProps {
  onSubmit: (selectedRoute: number | null) => void; // Pass selected route to parent
}

export function ComboboxForm({ onSubmit }: ComboboxFormProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  useEffect(() => {
    // Fetch available routes from API
    async function fetchData() {
      try {
        const response = await fetch("/api/getRoutes");
        const data = await response.json();

        const routes = data.routes.map((item: RoutesSep) => ({
          flightschedule_id: item.flightschedule_id,
          route: item.origin + " - " + item.destination + "  |  " + item.date,
        }));
        setRoutes(routes);
      } catch (err) {
        console.error("error", err);
      }
    }
    fetchData();
  }, []);

  // Setting up the form using react-hook-form and Zod for validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Handle form submission
  function handleSubmit() {
    onSubmit(selectedRoute);
  }

  return (
    <FormProvider {...form}>
      {/* Ensure all form fields are wrapped in FormProvider */}
      <div className="grid grid-cols-3 gap-4 items-center mt-1 mb-[-25px]">
        {/* Column 1: Label */}
        <div>
          <FormLabel className="text-xs">Flight Route</FormLabel>
        </div>

        {/* Column 2: Form (Popover for Route Selection) */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 ml-[-90px]"
          >
            <FormField
              control={form.control}
              name="route"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[250px] justify-between text-xs",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? routes.find(
                                (route) => route.route === field.value
                              )?.route
                            : "Select Route"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0 text-xs">
                      <Command>
                        <CommandInput placeholder="Search route..." />
                        <CommandList>
                          <CommandEmpty className="text-xs">
                            No routes found.
                          </CommandEmpty>
                          <CommandGroup>
                            {routes.map((route: any) => (
                              <CommandItem
                                className="text-xs"
                                value={route.route}
                                key={route.flightschedule_id}
                                onSelect={() => {
                                  form.setValue("route", route.route);
                                  setSelectedRoute(route.flightschedule_id); // Set selected route
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    route.route === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {route.route}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Column 3: Button */}
        <div>
          <Button
            className="text-xs"
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
          >
            Analyze
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}

export default ComboboxForm;
