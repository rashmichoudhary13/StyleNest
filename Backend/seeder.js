import mongoose from "mongoose";
import 'dotenv/config';
import productData from "./data/productData.js";
import Product from "./model/Product.js";
import Cart from "./model/Cart.js";
import userModel from "./model/User.js";

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URL);

// Function to populate data in database

const seedData = async() => {
    try{
        //clear exist data
        await Product.deleteMany();
        await userModel.deleteMany();
        await Cart.deleteMany();

        // Create a default admin user
        const createdUser = await userModel.create({
            clerkUserId: process.env.CLERK_ADMIN_USER_ID,
            email: process.env.ADMIN_EMAIL,
            role: "admin",
        })

         // Assign the default user ID to each product
         const userID = createdUser._id;

         const sampleProducts = productData.map((product) => {
            return { ...product, user: userID };
         });

         // Insert the products into the database
         await Product.insertMany(sampleProducts);

         console.log("Product data seeded successfully.")
         process.exit();
    }catch (error) {
        console.error("Error seeding the data: ", error);
        process.exit(1);
    }
}

seedData();