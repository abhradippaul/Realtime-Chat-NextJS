import {
  addUserToFriend,
  client,
  getUserPendingRequest,
  removeUserFromPendingRequest,
} from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
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

  pusherServer.trigger(
    `user__${userEmail}__dashboard_data`,
    "dashboard_data",
    {}
  );
  pusherServer.trigger(
    `user__${friendEmail}__dashboard_data`,
    "dashboard_data",
    {}
  );

  return NextResponse.json({
    message: "You have accepted the friend request with " + friendEmail,
    success: true,
  });
}

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  if (!userEmail) {
    return NextResponse.json(
      {
        message: "Please provide userEmail",
      },
      { status: 200 }
    );
  }
  const res = await getUserPendingRequest(userEmail);
  return NextResponse.json({
    success: true,
    friendRequest: res,
  });
}

export async function DELETE(req: NextRequest) {
  try {
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
    await removeUserFromPendingRequest(userEmail, friendEmail);
    const pendingFriend = await client.HLEN(`user:${userEmail}:pending:friend`);
    pusherServer.trigger(
      `user__${userEmail}__dashboard_data`,
      "dashboard_data",
      {
        pendingFriendLength: pendingFriend,
      }
    );
    return NextResponse.json({
      message: "You have deleted friend request of " + friendEmail,
      success: true,
    });
  } catch (err: any) {
    console.log("Next router error from add friend ", err.message);
  }
}
