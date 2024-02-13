import { googleSignInAction } from "@/actions/auth-actions";
import Image from "next/image";

export default function GoogleSignIn({logType}: {logType: string}) {


  return (
    <form action={googleSignInAction} className="w-full space-y-4">
      <button
        className="w-full border px-4 py-2 rounded-full shadow-xl hover:scale-110 transition-transform text-xl"
        type="submit"
      >
        <p className="inline-block">{logType} with</p>
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="google logo"
          width={24}
          height={24}
          className="inline-block ml-3"
        />
      </button>
    </form>
  );
}