import {
  Home,
  User,
  Search,
  Settings,
  TrendingUp,
  Plane,
  PlaneTakeoff,
  AlarmClockPlus,
  Users,
  MapPinHouse,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import Link from "next/link";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "././Admin",
    icon: Home,
  },
  {
    title: "Add Aircraft",
    url: "./addAircraft",
    icon: Plane,
  },
  {
    title: "Add Airport",
    url: "./addairport",
    icon: MapPinHouse,
  },

  {
    title: "Add Flight Schedule",
    url: "./addFlightSchedule",
    icon: AlarmClockPlus,
  },
  {
    title: "Show Airplanes",
    url: "./showAirPlanes",
    icon: Plane,
  },
  {
    title: "Show Flights",
    url: "./showFlight",
    icon: PlaneTakeoff,
  },
  {
    title: "Show Flight Schedules",
    url: "./showFlightSchedules",
    icon: AlarmClockPlus,
  },
  {
    title: "Passenger Details",
    url: "./getPassengers",
    icon: Users,
  },
  {
    title: "Revenues",
    url: "./getRevenue",
    icon: TrendingUp,
  },
];

export function AppSidebar() {
  return (
    <div className="h-screen   space-y-2 bg-gray-50 p-4 rounded-r-lg shadow-md bg-opacity-45">
      {items.map((item) => (
        <Link href={item.url} key={item.title}>
          <Card className="flex items-center space-x-3 p-3 hover:bg-gray-200 cursor-pointer mt-3 mb-3">
            <item.icon className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium">{item.title}</span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
