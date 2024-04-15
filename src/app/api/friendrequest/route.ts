import { getUserHash, getUserPendingRequest } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  //   console.log(data);
  const pendingRequest = await getUserPendingRequest(
    `user:${userEmail}:pending:friends`
  );
  if(!pendingRequest?.length) {
    return NextResponse.json(
      {
        message: "No pending request",
      },
      { status: 200 }
    );
  }
//   console.log(userData);
  return NextResponse.json({
    userInfo : pendingRequest,
    success: true,
  });
}
