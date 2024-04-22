import { client, getUserHash, setUserPendingRequest } from "@/lib/db";
import { pusherServer, toPusherKey } from "@/lib/pusher";
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
    // const isFriendAdded = await setUserPendingRequest({ email, userEmail });

    const isPending = await client.HEXISTS(
      `user:${userEmail}:pending:friend`,
      email
    );
    const isAccepted = await client.HEXISTS(
      `user:${userEmail}:friendlist`,
      email
    );
    if (isPending || isAccepted) {
      return NextResponse.json({
        message: "Already in your friend list",
        success: false,
      });
    }
    const isFriendAdded = await client.HSET(
      `user:${email}:pending:friend`,
      userEmail,
      ""
    );
    if (!isFriendAdded) {
      return NextResponse.json({
        message: "Friend request send error",
        success: false,
      });
    }
    // const pendingFriend = await client.HLEN(`user:${email}:pending:friend`);
    const userInfo = await client.HGETALL(`user:${userEmail}`);
    pusherServer.trigger(`user__${email}__pending_friend`, "pending_friend", {
      ...userInfo,
      email: userEmail,
    });
    // console.log(pendingFriend);
    // pusherServer.trigger(`user__${email}__dashboard_data`, "dashboard_data", {
    //   friendlist: {},
    //   pendingFriendLength: pendingFriend,
    // });
    return NextResponse.json({
      message: "Friend request send successfully",
      success: true,
    });
  } catch (err: any) {
    console.log("Next router error from add friend ", err.message);
  }
}
