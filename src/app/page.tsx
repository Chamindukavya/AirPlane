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



    </div>
  );
}
