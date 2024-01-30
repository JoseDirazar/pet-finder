import Image from "next/image";
import { Card, CardContent } from "./card";
import Link from "next/link";
import { JsonArray, JsonObject, JsonValue } from "@prisma/client/runtime/library";

export interface ImagesUrlsType extends JsonObject  {url: string}

export interface PostType {
    id: string;
    name: string;
    imagesUrls: ImagesUrlsType[];
    age: string;
    petType: string;
    archived: boolean | null;
    lost: boolean | null;
    city: string;
    state: string;
    description: string;
    userId: string;
  }
export default function PetCard({ data }: {data: PostType}) {

  
  return (
    <Card
      className="group h-full  space-y-4 rounded-xl hover:scale-110 transition-transform"
      key={data.id}
    >
      <div className="relative aspect-square rounded-xl bg-gray-100">
        <Image
          src={data?.imagesUrls[0]?.url}
          alt={data.name}
          fill
          sizes="(max-width: 768px) 567px, 567px, (max-width: 1200px) 275px, 275px"
          className="aspect-[3/2] rounded-md object-cover"
        />
      </div>
      <CardContent>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <Link href={`/mis_publicaciones/${data.id}/editar`}>Editar</Link>
      </CardContent>
    </Card>
  );
}
