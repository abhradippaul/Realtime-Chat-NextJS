import { getUserHash, setUserFriend } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, userEmail } = await req.json();
    const isExist = await getUserHash(`user:${email}`);
    if (!isExist) {
      const response = NextResponse.json(
        {
          message: "User does not exist",
        },
        { status: 200 }
      );
      return response;
    }
    if (!userEmail) {
      return NextResponse.json(
        {
          message: "Please Login",
        },
        { status: 200 }
      );
    }
    const isFriendAdded = await setUserFriend(
      `user:${email}:pending:friends`,
      userEmail
    );
    if (isFriendAdded) {
      return NextResponse.json({
        message: "Already in your friend list",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Friend request send successfully",
      success: true,
    });
  } catch (err: any) {
    console.log("Next router error from add friend ", err.message);
  }
}

