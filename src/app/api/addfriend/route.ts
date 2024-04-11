import { getHash } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const isExist = await getHash(`user:${email}`);
    // console.log(email);
    // console.log(isExist);
    if (!isExist) {
      return NextResponse.json(
        {
          message: "User does not exist",
        },
        { status: 200 }
      );
    }
    return NextResponse.json({
      message: "Testing response",
      user: isExist,
    });
  } catch (err: any) {
    console.log("Next router error from add friend ", err.message);
  }
}

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };
