import { NextRequest } from "next/server";
import prisma from "./prismaClient";

export const getClientIP = (request: NextRequest) => {
  const forwardHeader = request.headers.get("x-forwarded-for");
  console.log("Before Split", forwardHeader);
  const ipAddress = forwardHeader
    ? forwardHeader.split(",")[0]
    : (request.ip as string);
  return ipAddress;
};

export const storeIPAddress = async (userId: string, ipAddress: string) => {
  await prisma.ipAddress.create({
    data: {
      userId: userId,
      ipAddress: ipAddress,
    },
  });
};
