import { client } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userEmail = req.nextUrl.searchParams.get("userEmail");
    const friendEmail = req.nextUrl.searchParams.get("friendEmail");

    if (!userEmail || !friendEmail) {
      return NextResponse.json(
        {
          message: "User email and friend email are required",
        },
        { status: 400 }
      );
    }

    const isUserExist = await client.HGET(
      `user:${userEmail}:friendlist`,
      `${friendEmail}`
    );
    const isFriendExist = await client.HGET(
      `user:${friendEmail}:friendlist`,
      `${userEmail}`
    );

    if (!isFriendExist || !isUserExist || !(isFriendExist === isUserExist)) {
      return NextResponse.json(
        {
          message: "User and friend are not in the friend list",
        },
        { status: 200 }
      );
    }

    const friendInfo = await client.HGETALL(`user:${friendEmail}`);

    const chat = await client.zRange(`chat:${isFriendExist}:messages`, 0, -1);

    if (!chat) {
      return NextResponse.json(
        {
          success: true,
          data: chat,
        },
        { status: 200 }
      );
    }

    pusherServer.trigger(
      `user__${userEmail}__dashboard_data`,
      "dashboard_data",
      {}
    );
    await client.HSET(`user:${userEmail}:pending:chats`, friendEmail, 0);

    return NextResponse.json(
      {
        success: true,
        data: chat,
        friendInfo: {
          ...friendInfo,
          chatId: isFriendExist,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const receiver = req.nextUrl.searchParams.get("friendEmail");
    const sender = req.nextUrl.searchParams.get("userEmail");
    const chatId = req.nextUrl.searchParams.get("chatId");
    const { msg } = await req.json();
    if (!receiver || !sender) {
      return NextResponse.json(
        {
          message: "User email and friend email are required",
        },
        { status: 400 }
      );
    }

    if (!msg || !chatId) {
      return NextResponse.json(
        {
          message: "Message and chat id are required",
        },
        { status: 400 }
      );
    }
    const timeStamp = Math.floor(Date.now() / 1000);
    const message = await client.ZADD(`chat:${chatId}:messages`, {
      value: JSON.stringify({
        message: msg,
        sender: sender,
        receiver: receiver,
        timeStamp: timeStamp,
      }),
      score: timeStamp,
    });

    if (!message) {
      return NextResponse.json(
        {
          message: "Something error in redis while sending message",
        },
        { status: 400 }
      );
    }
    pusherServer.trigger(`chat__${chatId}__messages`, "messages", {
      msg: msg,
      sender: sender,
      receiver: receiver,
      timeStamp: timeStamp,
    });

    const unReadMsg = await client.HGET(
      `user:${receiver}:pending:chats`,
      sender
    );
    if (unReadMsg) {
      await client.HSET(
        `user:${receiver}:pending:chats`,
        sender,
        parseInt(unReadMsg) + 1
      );
    } else {
      await client.HSET(`user:${receiver}:pending:chats`, sender, 0);
    }

    pusherServer.trigger(
      `user__${receiver}__dashboard_data`,
      "dashboard_data",
      {}
    );

    return NextResponse.json(
      {
        message: {
          message: msg,
          sender: sender,
          receiver: receiver,
          timeStamp: timeStamp,
        },
        success: true,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
