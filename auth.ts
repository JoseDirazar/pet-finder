import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import db from "./lib/prismadb";
import authConfig from './auth.config'
import { getUserById } from "./lib/user";

export const {handlers: {GET, POST}, auth, signIn, signOut, } = NextAuth({
 /*  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  }, */
    callbacks: {
      async signIn({ user }) {
       /*  if(user.id) {  logica para loguear solo usuarios con email verificado - para usarlo falta que al loguear con google se verifique el campo automaticamente
          const existingUser = await getUserById(user.id)

          if(!existingUser || !existingUser?.emailVerified) {
            return false
          }
        } */
        return true
      }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt'},
  ...authConfig
})