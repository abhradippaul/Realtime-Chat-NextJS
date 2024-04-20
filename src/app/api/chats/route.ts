import { client } from "@/lib/db";
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

    const isUserExist = await client.HEXISTS(
      `user:${userEmail}:friendlist`,
      `${friendEmail}`
    );
    const isFriendExist = await client.HEXISTS(
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

    const chat = await client.SMEMBERS(`chat:${isFriendExist}:messages`);

    if (!chat) {
      return NextResponse.json(
        {
          success: true,
          data: chat,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: chat,
        friendInfo: friendInfo,
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

    const message = await client.SADD(
      `chat:${chatId}:messages`,
      JSON.stringify({
        timeStamp: Math.floor(Date.now() / 1000),
        sender: sender,
        receiver: receiver,
        message: msg,
      })
    );

    if (!message) {
      return NextResponse.json(
        {
          message: "Something error in redis while sending message",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Message send",
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
