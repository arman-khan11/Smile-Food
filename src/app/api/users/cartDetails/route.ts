    import { connectDb } from "@/DBconfig/db";
    import User from "@/models/user.models";

    import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await connectDb(); // Ensure this is awaited
        
        const reqbody = await request.json();
        
        const { Email, productId, price, quantity, imageUrl } = reqbody;
        const user = await User.findOne({ Email });
        
        if (!user) {    
            return NextResponse.json({
                success: false, // Change to false for clarity
                message: "User not found"
            });
        }
        
        const newItem = {
            productId,
            quantity,
            price,
            imageUrl,
        };

        // Add item to cart
        user.cart.totalPrice += price * quantity;
        user.cart.items.push(newItem);

        await user.save(); // Save the updated user back to the database
        
        return NextResponse.json({
            success: true,
            message: "Item added to cart successfully",
                  user //jsut for conferm
        });

    } catch (error) {
        if (error instanceof Error){
        return NextResponse.json({
            success: false, // Indicate failure
            message: error.message
        });
    }}
};
