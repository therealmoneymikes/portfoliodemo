import prisma from "@/app/utils/prismaClient";
import { contactSchema} from "@/app/utils/schema";
import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
// import WelcomeTemplate from "@/emails/WelcomeTemplate";
// import fs from "fs";

// const resend = new Resend(process.env.RESEND_API_KEY);

// const filepath = `${__dirname}/static/invoice.pdf`;
// const attachment = fs.readFileSync(filepath).toString("base64");

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body) return NextResponse.json("No data received", { status: 400 });

  const validate = contactSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.errors[0], { status: 400 });

   await prisma.clientContact.create({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      clientType: body.clientType,
      email: body.email,
      phone: body.phone,
      message: body.message,
    },
  });

  // await resend.emails.send({
  //   from: "Mike <admin@mikethedev.com>",
  //   to: newClient.email,
  //   subject: `Welcome ${newClient.firstname}!`,
  //   react: WelcomeTemplate({ name: body.username }),
  //   attachments: [
  //     {
  //       content: attachment,
  //       filename: "invoice.pdf",
  //     },
  //   ],
  // });

  return NextResponse.json({ status: 201 });
}
