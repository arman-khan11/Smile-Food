import { connectDb } from "@/DBconfig/db";
import User from "@/models/user.models";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
try {
    connectDb()
      const reqbody = await request.json()
    const{Email} = reqbody
    
    const user = await User.findOne({Email})
    if(!user){
        return NextResponse.json({success:false,message:"Collection not found "})
    }
     
    return NextResponse.json({
        success: true,
        message: "item found successfully",
        user
         
    });
    
    
} catch (error) {
    if (error instanceof Error){

    return NextResponse.json({success:false, message:"occured during transiction"})
    
}}


};
