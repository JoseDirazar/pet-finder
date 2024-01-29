import db from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();

  const posts = await db.pet.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <div className="h-screen w-full">
      <Link href={`/mis_publicaciones/${user?.id}/crear`}>Crear publicacion</Link>
      <div>
        {posts ? (
          posts.map((post) => <div>{post.name}</div>)
        ) : (
          <div>No hay publicaciones</div>
        )}
      </div>
    </div>
  );
}
