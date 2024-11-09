import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(request:NextRequest)=>{
   try {
     const reqbody = await request.json()
     const {token} = reqbody
    const user = await User.findOne({VerifyToken:token})
    if(!user){
       
        return NextResponse.json({success: false, message: "User not found"})
    }
    user.isVerified = true;
    user.VerifyToken = undefined;
    user.VerifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ message: "Email verified successfully" },
       { status: 200},
    )
   
 }
   
    catch (error) {
    if (error instanceof Error){


       return NextResponse.json({success: false, message: "User not found"})
    
   }}}