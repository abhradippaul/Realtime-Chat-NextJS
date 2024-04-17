import { getUserFriends } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  if (!userEmail) {
    return NextResponse.json(
      {
        message: "userEmail is required",
      },
      { status: 400 }
    );
  }
  const userInfo = await getUserFriends(`user:${userEmail}:friendlist`);
  if (!userInfo) {
    return NextResponse.json(
      {
        message: "Something error in redis while accepting request",
      },
      { status: 200 }
    );
  }
  return NextResponse.json({
    success: true,
    friends: userInfo,
  });
}
