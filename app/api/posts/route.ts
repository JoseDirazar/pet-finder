import { currentUser } from "@clerk/nextjs";
import db from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("user not found", { status: 404 });
    const dbUser = await db.user.findUnique({
      where: {
        userId: user.id,
      },
    });
   
    if(!dbUser) return new NextResponse("user not found", { status: 404 });
    const { name, petType, age, lost, imagesUrls, location, description } = await req.json();
    //console.log("REQUEST:: ", { name, petType, age, lost, imagesUrls });
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

export async function PATCH(req: Request) {
  try {
    const user = await currentUser()
    if (!user) return new NextResponse("user not found", { status: 404 });
    const dbUser = await db.user.findUnique({
      where: {
        userId: user.id,
      },
    });
    if(!dbUser) return new NextResponse("user not found", { status: 404 });
    const { name, petType, age, lost, imagesUrls, city, state, description, id, archived } = await req.json();
    //console.log("REQUEST:: ", { name, petType, age, lost, imagesUrls });
    const status = lost === "perdido" ? true : false;
    const pet = await db.pet.update({
      where: {
        id,
      },
      data: {
        name,
        age,
        imagesUrls,
        petType,
        lost: status,
        city,
        state,
        description,
        archived,
      }
    })
    if(!pet) return new NextResponse("Pet not created", { status: 404 });

    return new NextResponse('Pet updated.', {status: 200})
  } catch (error) {
    console.log(error)
    return new NextResponse('Algo salio mal.', {status: 501})
  }
}
