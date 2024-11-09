import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MongoDb_URL!, {
          
            // Add more options if necessary
        });
        console.log("MongoDB connected");
    } catch (error) {
        if (error instanceof Error) {
            console.log("Something went wrong:", error.message);
        } else {
            console.log("Something went wrong:", error);
        }
        process.exit(1);
    }
};
