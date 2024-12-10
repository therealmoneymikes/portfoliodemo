import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../app/utils/prismaClient";
// import { getClientIP, storeIPAddress } from "@/app/utils/ipaddress";
import bcrypt from "bcrypt";
import { userSignUpSchema } from "../../utils/schema";
import { Resend } from "resend";
import WelcomeTemplate from "../../../emails/WelcomeTemplate";

let user: any;
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body) return NextResponse.json("No Data Found", { status: 400 });

    const validatedData = userSignUpSchema.safeParse(body);
    if (!validatedData.success)
      return NextResponse.json(validatedData.error.errors);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.email },
          { username: body.username },
          { phone: body.phone },
        ],
      },
    });

    if (existingUser) {
      let message: Record<string, string> = {};
      if (existingUser.email === body.email) {
        message.email = "Email already in use";
      }
      if (existingUser.username === body.username) {
        message.username = "Username already in use";
      }
      if (existingUser.phone === body.phone) {
        message.phone = "Phone already in use";
      }

      return NextResponse.json(
        { message: "Conflict Error", errors: message },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);

    user = await prisma.user.create({
      data: {
        email: body.email,
        emailVerified: body.email === body.emailVerified,
        username: body.username,
        password: hashedPassword,
        phone: body.phone,
      },
    });

    // const ipAddress = getClientIP(request);
    // await storeIPAddress(user!.id, ipAddress);
    //Add domain here
    const ContactDelay = new Date(Date.now() + 1000 * 30).toISOString();
    await resend.emails.send({
      from: "Mike <admin@mikethedev.com>",
      to: user.email,
      subject: "Welcome!",
      react: WelcomeTemplate({ name: body.username }),
      scheduledAt: ContactDelay,
    });

    return NextResponse.json(
      { message: "Signup successful", data: user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
