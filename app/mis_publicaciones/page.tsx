import db from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Location from "../../components/location";
import { getUserPosts } from "@/actions/getUserPosts";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return <div>Ocurrio un error: usuario no encontrado</div>;
  }

  const userDb = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  const posts = await getUserPosts(userDb?.id);

  return (
    <div className="h-screen w-full">
      <Link href={`/mis_publicaciones/crear`}>Crear publicacion</Link>
      <div>
        {!!posts ? (
          posts?.map((post) => <div key={post.id}>{post.name}</div>)
        ) : (
          <div>No hay publicaciones</div>
        )}
      </div>
     
    </div>
  );
}
