import prisma from "@/app/utils/prismaClient";
import { userLoginSchema } from "@/app/utils/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getClientIP, storeIPAddress } from "@/app/utils/ipaddress";

const key = process.env.LOGIN_PRIVATE_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body) return NextResponse.json("No Data Received", { status: 400 });

    const validate = userLoginSchema.safeParse(body);
    if (!validate.success)
      return NextResponse.json(
        { message: "Data Validation", errors: validate.error.errors },
        { status: 400 }
      );

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
      },
    });

    if (!user) return NextResponse.json("Invalid Credentials", { status: 400 });

    const userPassword = await bcrypt.compare(body.password, user.password);
    if (!userPassword)
      return NextResponse.json(
        { success: false, message: "Invalid Credentials" },
        { status: 400 }
      );

    if (!key) {
      console.error("JWT secret key is not defined");
      return NextResponse.json(
        { success: false, message: "Server Configuration Error" },
        { status: 500 }
      );
    }
    const token = jwt.sign({ body }, key, { expiresIn: "24h" });

    return NextResponse.json(
      { token: token, message: "Sign In Successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
