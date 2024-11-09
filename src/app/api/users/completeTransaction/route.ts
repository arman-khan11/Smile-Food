  import { connectDb } from "@/DBconfig/db";
  import User from "@/models/user.models";
  import { NextRequest, NextResponse } from "next/server";

  export const POST = async (request: NextRequest) => {
    try {
      await connectDb(); // Ensure the database is connected
      const reqBody = await request.json();
      const { Email } = reqBody;

      // Find user by Email
      const user = await User.findOne({ Email });
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User not found",
        });
      }

      // Update orderId in the user's cart items
      user.cart.items = undefined;
      user.totalPrice = undefined;
      await user.save(); // Save updated user information

      return NextResponse.json({
        success: true,
        message: "Order ID added to cart items successfully",
      });
    } catch (error) {
      if (error instanceof Error){

      console.error("Error updating order ID:", error);
      return NextResponse.json({
        success: false,
        message: "Failed to update order ID. Please try again later.",
        error: error.message,
      })};
    }
  };
