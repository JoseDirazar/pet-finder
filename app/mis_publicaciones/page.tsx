import db from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import Image from "next/image";
import { Card } from "@/components/ui/card";


interface PostType {
  id: string;
  name: string;
  imagesUrls: { url: string }[];
  age: string;
  petType: string;
  archived: boolean | null;
  lost: boolean | null;
  city: string;
  state: string;
  description: string;
  userId: string;
}

export default async function Page() {
  const user = await currentUser();

  const userDb = await db.user.findUnique({
    where: {
      userId: user?.id,
    },
  });

  const posts = (await db.pet.findMany({
    where: {
      userId: userDb?.id,
    },
  })) as PostType[];

  return (
    <div className="h-screen w-full">
      <Link href={`/mis_publicaciones/crear`}>Crear publicacion</Link>
      <div className="flex flex-wrap w-full ">
        {!!posts ? (
          posts?.map((post) => (
            <Card
              className="flex border w-300 max-h-400 flex-col mx-4 items-center justify-center"
              key={post.id}
            >
              <Image
                src={post?.imagesUrls[0].url as string}
                alt={post.name}
                width={250}
                height={250}
              />
              <h2>{post.name}</h2>
              <p>{post.description}</p>
            </Card>
          ))
        ) : (
          <div>No hay publicaciones</div>
        )}
      </div>
    </div>
  );
}
