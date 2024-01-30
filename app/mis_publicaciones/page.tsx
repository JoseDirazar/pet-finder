import db from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Location from "../../components/location";
import { getUserPosts } from "@/actions/getUserPosts";
import Image from "next/image";
import { Card } from "@/components/ui/card";

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
      <div className="flex flex-wrap w-full ">
        {!!posts ? (
          posts?.map((post) => <Card className="flex border w-300 max-h-400 flex-col mx-4 items-center justify-center" key={post.id}>
            <Image src={post.imagesUrls[0].url} alt={post.name} width={250} height={250}/>
            <h2>{post.name}</h2>
            <p>{post.description}</p>
            </Card>)
        ) : (
          <div>No hay publicaciones</div>
        )}
      </div>
     
    </div>
  );
}
