'use server'
import { auth, signIn, signOut  } from "@/auth";
import db from "@/lib/prismadb";
import { AuthError } from "next-auth";

import bcrypt from 'bcryptjs'
import { getUserByEmail } from "@/lib/user";
import { z } from "zod";
import { User } from "@prisma/client";

export async function googleSignInAction() {
    await signIn('google', {redirectTo: '/'})
}

export async function signOutAction() {
  const session = await auth()
    await db.account.deleteMany({
      where: {
        userId: session?.user?.id
      }
    })
    await signOut({redirectTo: '/'})
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
/*     console.log('register form data:: ',formData)
    const validatedFields = RegisterSchema.safeParse(formData);
    console.log('register validate fields::', validatedFields)

  if (!validatedFields.success) {
   throw new Error("Invalid fields!");
  }
 */
  const email = formData.get('email') as string;
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if(!email || !name || !password) throw new Error('Values missing')
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
   throw new Error("Email already in use!");
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
  

  /* const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  ); */
}

async function getUserById(id: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      id,
    }
  })

  return user
}