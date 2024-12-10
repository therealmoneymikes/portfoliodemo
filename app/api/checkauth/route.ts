import prisma from "../../utils/prismaClient"
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const body = await request.json();

  const token = cookies().get("jwt-token")?.value
  if(token)
    return NextResponse.json({message: token}, {status: 200})

  
  const user = prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 400 });

  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
