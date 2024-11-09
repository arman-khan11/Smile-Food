import { connectDb } from "@/DBconfig/db";
import User from "@/models/user.models";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/maler";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb(); // Connect inside the handler
    const reqBody = await request.json();
    const { Email, Password, Username, location, Firstname, Lastname } = reqBody;

    // Check if user exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        {
          status: 409, // Conflict status code for existing resource
        }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(Password, salt);
    console.log(hashedPassword);

    // Create new user  
    const newUser = new User({
      Email,
      Password: hashedPassword,
      Username,
      location,
      Firstname,
      Lastname,
    });

    const savedUser = await newUser.save();
    await sendEmail({ Email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      Username: Username,
      Email: Email,
      location: location,
    });
  } catch (error) {
    if (error instanceof Error){

    console.error("Error creating user:", error); // Log for debugging
    return NextResponse.json(
      { success: false, message: "User creation failed due to server error" },
      { status: 500 }
    );
  }}
};
