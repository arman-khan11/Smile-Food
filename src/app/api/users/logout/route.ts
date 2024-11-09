import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      success: true,
      message: "User logout successfully",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
     
    });
   

    // Ensure the response is returned
    return response;
  } catch (error) {
    console.log(error instanceof Error ? error.message : "An unknown error occurred");

    // Return an error response to avoid unhandled route behavior
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
