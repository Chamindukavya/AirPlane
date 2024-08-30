import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <p>
        Hello {session?.user?.name}! <br />
      </p>

      <button className='p-4 border-2 bg-slate-400 hover:bg-slate-200' >
        <a href="/FlightSchedules">Flight Schedules</a>
      </button>

    </div>
  );
}
