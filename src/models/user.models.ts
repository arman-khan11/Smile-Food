
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    productId: { 
      type: Number, 
      required: true 
    },
    OrderId: { 
      type: Number, 
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 1

    },
    price: { 
      type: Number, 
      required: true 
    },
    imageUrl: { // Add the product image URL
      type: String,
      required: true
    }
  });
  
const userSchema = new mongoose.Schema({

    Username:{
      
        required : true,
        
        type : String,
        unique : true
    },
    
    Email:{
        required : true,
        type : String,
        unique : true
    },
    Password:{
        required : true,
        type : String,
    
    },
    Firstname:{
        optional : true,
        type : String,
    },
    location:{
        required : true,
        type : String,
    },
    
    Lastname:{
        optional : true,
        type : String,
    },
    cart: { // Embedding the cart into the user schema
        items: [CartItemSchema], // Array of items in the cart
        totalPrice: {
          type: Number,
          default: 0,
        },
      },
    forgetPasswordToken : String,
    forgetPasswordTokenExpiry : Date,
    VerifyToken : String,
    VerifyTokenExpiry : Date,
    isVerified: {type: Boolean,
        default: false
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
   
})

userSchema.pre("save", function (next) {
  this.Username = this.Username.toLowerCase();
  next();
});
const User = mongoose.models.Users || mongoose.model("Users",userSchema)
 export default User