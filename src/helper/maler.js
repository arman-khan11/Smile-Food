import nodemailer from "nodemailer"
import { connectDb } from "@/DBconfig/db";
import User from "@/models/user.models"
import { generateVerificationCode } from "./verificatinsCode";
connectDb()
export const sendEmail = async({Email, emailType, userId}) => {
    try {
        const verificationCode = await generateVerificationCode();
      if(emailType ==="VERIFY"){
        await User.findByIdAndUpdate(userId,{
            $set:{VerifyToken:verificationCode,
                VerifyTokenExpiry: Date.now()+3600000 // one hour
            }
        })};
        if(emailType ===" RESET"){
            await User.findByIdAndUpdate(userId,{
                $set:{forgetPasswordToken:verificationCode,
                    forgetPasswordTokenExpiry: Date.now()+3600000 // one hour
                }
            })};
            console.log("otp saved successfully")
// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
   service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
    }

  });
 const mailOptions = {
            from: 'vrsehdow@gmail.com',
            to: Email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: white;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                padding: 20px;
                background-color: white;
            }
            .content {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                background-color: red;
                padding: 20px;
                color: white;
                border-radius: 8px 8px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .body {
                padding: 20px;
                text-align: center;
            }
            .body p {
                font-size: 16px;
                line-height: 1.5;
            }
            .btn {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: red;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 20px;
            }
            .footer a {
                color: red;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="header">
                    <h1>Smile Food</h1>
                </div>
                <div class="body">
                
                    <p>Hello,</p>
                    <p>${emailType === "VERIFY" ? "Thank you for signing up. Please verify your email by clicking the button below:" : "You requested a password reset. Click the button below to reset your password:"}</p>
                    <P>This is your verfication code:${verificationCode}</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Smile Food. All rights reserved.</p>
                    <p>If you have any questions, contact us at <a href="mailto:support@smilefood.com">support@smilefood.com</a></p>
                </div>
            </div>
        </div>
    </body>
`
        }
        const mailresponse = await transport.sendMail
        (mailOptions);
        console.log(mailresponse)
        return mailresponse;
    } catch (error) {
        console.log(error)
    }
}