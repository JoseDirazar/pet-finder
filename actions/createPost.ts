import db from "@/lib/prismadb";

type FormData = {
    userId: string;
    name: string;
    imageUrl: string;
    petType: string;
    age: string;
    lost: boolean
}

export async function createPost(formData: FormData) {
    const {userId, name, imageUrl, petType, age, lost} = formData
    try {
        const pet = await db.pet.create({
            data: {
                userId,
                name,
                imageUrl,
                petType,
                age,
                lost,
            }
        })
    } catch (error) {
        
    }
}