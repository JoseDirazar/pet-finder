import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import db from "./lib/prismadb";
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from "next-auth";
import type { User } from "@prisma/client";


async function getUser(email: string): Promise<User | null> {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        //console.log('db user:: ', user)
        return user
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export default {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
            
        }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                  .object({ email: z.string().email(), password: z.string().min(6) })
                  .safeParse(credentials);
        
                if (parsedCredentials.success) {
                  const { email, password } = parsedCredentials.data;
                  const user = await getUser(email);
                 
                  if (!user || !user.password) {
                    console.log('NULL USER OR PASSWORD')
                    return null
                  };
        
                  const passwordsMatch = await bcrypt.compare(password, user.password); 
                  //console.log(password)
                  if (passwordsMatch) return user;
                }
                console.log("Invalid credentials");
                return null;
              },
        })
    ],
    
} satisfies NextAuthConfig