import { NextRequest,NextResponse } from "next/server";
import { connectDb } from "@/DBconfig/db";
import User from "@/models/user.models";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


connectDb()
export const POST = async(request : NextRequest)=>{
try {
    const reqbody =  await request.json();

const { Email, Password} = reqbody;

const user = await User.findOne({ Email });
if(!user){
    return NextResponse.json({success: false, message:"User not exist"})

}
 const isvalidpassowrd = await bcryptjs.compare(Password,user.Password)
 if(!isvalidpassowrd){
    return NextResponse.json({success: false, message:"Invalid password"})
 }
//   create payload

const tokenData = {
    id:user._id,
    Email :user.Email
}
//  create jwt token 
const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });
const response = NextResponse.json({success: true, message:"login successful",
})
response.cookies.set("token",token,{
    httpOnly: true,
   
})  
return response;

} catch (error) {
    if (error instanceof Error){

    console.log({success:false},{message:"user not exist"})}
    

}
}