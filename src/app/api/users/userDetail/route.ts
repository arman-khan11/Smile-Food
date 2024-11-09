import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/DBconfig/db";
import User from "@/models/user.models";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();

    const reqBody = await request.json();
    const { Email } = reqBody;

    const user = await User.findOne({ Email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.Username,
        email: user.Email,
        location: user.location,
      },
    });
  } catch (error) {
    if (error instanceof Error){

    return NextResponse.json({ success: false, message: error.message });
  }}
};
