import { signOutAction } from "@/actions/auth-actions";
import { auth } from "@/auth";
import Image from "next/image";

export default async function SignOut() {
  const session = await auth();

  if (session) {
    return (
        <form action={signOutAction}>
          <button className="border rounded-full py-2 px-4 shadow-lg bg-gradient-to-br from-red-400 to-red-700 text-xl text-white hover:scale-110 transition-transform" type="submit">Sign Out</button>
        </form>
    );
  }
}
