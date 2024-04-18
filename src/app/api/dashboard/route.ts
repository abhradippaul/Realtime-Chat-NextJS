import { getUserDashboard, getUserPendingRequestLength } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  // console.log(userEmail);
  if (!userEmail) {
    return NextResponse.json({
      message: "Please provide a valid email",
    });
  }
  const res = await getUserDashboard({ userEmail });
//   if (!res.friendList.length || !res.pendingFriend.length) {
//     return NextResponse.json({
//       message: "Chat empty",
//     });
//   }
  return NextResponse.json({
    success: true,
    ...res,
  });
}
