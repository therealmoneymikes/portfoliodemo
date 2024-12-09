import { getToken, GetTokenParams } from "next-auth/jwt";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest){
    const token = await getToken({req: request})
    return NextResponse.json(token)
}