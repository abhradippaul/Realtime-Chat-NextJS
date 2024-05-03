import {
  client,
  getUserDashboard,
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  if (!userEmail) {
    return NextResponse.json({
      message: "Please provide a valid email",
    });
  }
  const res = await getUserDashboard({ userEmail });
  const pendingChat = await client.HGETALL(`user:${userEmail}:pending:chats`);
  return NextResponse.json({
    success: true,
    ...res,
    pendingChat: pendingChat,
  });
}
