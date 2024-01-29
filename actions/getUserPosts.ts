import db from "@/lib/prismadb";


export async function getUserPosts(userId: string) {
    try {
        const posts = await db.pet.findMany({
            where: {
                userId
            }
        })
        if(!posts) return "No posts found for this user."
        
        return posts
    } catch (error) {
        
    }
    
}