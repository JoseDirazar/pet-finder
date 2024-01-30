import db from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import PetCard, { PostType } from "@/components/ui/pet-card";
import { JsonArray, JsonValue } from "@prisma/client/runtime/library";




export default async function Page({searchParams}: {searchParams: {city: string, state: string}}) {
  const user = await currentUser();

  const userDb = await db.user.findUnique({
    where: {
      userId: user?.id,
    },
  });

  const posts = await db.pet.findMany({
    where: {
      userId: userDb?.id,
    },
  }) as PostType[];

  return (
    <div className="flex min-h-screen flex-col items-center p-8 gap-y-2">
      <Link href={`/mis_publicaciones/crear`}>Crear publicacion</Link>
      <div className="flex flex-col p-8 gap-y-2">
        {!!posts ? (
          posts?.map((post) => (
            <PetCard data={post} key={post.id} />
          ))
        ) : (
          <div>No hay publicaciones</div>
        )}
      </div>
    </div>
  );
}
