import { addUserToFriend, removeUserFromPendingRequest } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const friendEmail = req.nextUrl.searchParams.get("friendEmail");
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  if (!userEmail || !friendEmail) {
    return NextResponse.json(
      {
        message: "Please provide userEmail and friendEmail",
      },
      { status: 200 }
    );
  }
  await addUserToFriend(userEmail, friendEmail);
  return NextResponse.json({
    message: "You have accepted the friend request with "+friendEmail,
    success: true,
  });
}

export async function DELETE(req: NextRequest) {
  const friendEmail = req.nextUrl.searchParams.get("friendEmail");
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  if (!userEmail || !friendEmail) {
    return NextResponse.json(
      {
        message: "Please provide userEmail and friendEmail",
      },
      { status: 200 }
    );
  }
  await removeUserFromPendingRequest(userEmail,friendEmail);
  return NextResponse.json({
    message: "You have deleted friend request of "+friendEmail,
    success: true,
  });
}
