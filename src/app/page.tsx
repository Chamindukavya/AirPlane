import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import AirportSearch from "./components/AirportSearch";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <p>
        Hello {session?.user?.name}! <br />
      </p>
      <AirportSearch />

    <button className=" bg-slate-400 hover:bg-slate-300">
      <a href="/flights">Flights</a>
    </button>

    </div>
  );
}
