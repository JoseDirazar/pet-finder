import NextAuth from "next-auth"

import authConfig from "./auth.config"
import { DEFAULT_LOGIN_REDIRECT, authRoutes } from "./middleware-routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
const { nextUrl } = req
console.log('NEXTURL:: ',nextUrl)
const isLoggedIn = !!req.auth

const isAuthRoute = authRoutes.includes(nextUrl.pathname);


  if(isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  }
