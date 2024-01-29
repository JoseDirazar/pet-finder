import db from "@/lib/prismadb";


export async function getUserPosts(userId: string | undefined) {
    try {
        if(!userId) return 
      

        const posts = await db.pet.findMany({
            where: {
                userId,
            }
        })
      
        
        return posts
    } catch (error) {
        console.log(error)
    }
    
}