import db from "@/lib/prismadb"
import PetForm from "./components/postForm"
import { PostType } from "@/components/ui/pet-card"
export default async function EditPetPage({params}: {params: {postId: string}}) {
    const pet = await db.pet.findUnique({
        where: {
            id: params.postId
        }
    }) as PostType
   
  return (
    <PetForm initialData={pet} />
  )
}
