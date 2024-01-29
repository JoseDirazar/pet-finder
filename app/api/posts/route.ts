import { currentUser } from "@clerk/nextjs";
import db from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    console.log('ClerkUser:: ',user)
    if (!user) return new NextResponse("user not found", { status: 404 });
    const dbUser = await db.user.findUnique({
      where: {
        userId: user.id,
      },
    });
    console.log('DbUser:: ',dbUser)
    if(!dbUser) return new NextResponse("user not found", { status: 404 });
    const { name, petType, age, lost, imagesUrls, location, description } = await req.json();
    console.log("REQUEST:: ", { name, petType, age, lost, imagesUrls });
    const status = lost === "perdido" ? true : false;

    const pet = await db.pet.create({
      data: {
        name,
        age,
        imagesUrls,
        petType,
        lost: status,
        userId: dbUser.id,
        city: location.city,
        state: location.state,
        description,
      },
    });

    return NextResponse.json({ pet });
  } catch (error) {
    console.log(error);
    return new NextResponse("Algo salio mal.", { status: 501 });
  }
}
