import mongoose from "mongoose";
import 'dotenv/config';
import Product from "./model/Product.js";
import Cart from "./model/Cart.js";
import userModel from "./model/User.js";

import XLSX from "xlsx";

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URL);

// Function to populate data in database

const seedData = async () => {
    try {
        //clear exist data
        await Product.deleteMany();
        await userModel.deleteMany();
        await Cart.deleteMany();

        // Create a default admin user
        const createdUser = await userModel.create({
            clerkUserId: process.env.CLERK_ADMIN_USER_ID,
            name: "Rakesh Kumar",
            email: process.env.ADMIN_EMAIL,
            role: "admin",
        })

        // Assign the default user ID to each product
        const userID = createdUser._id;

        //Read a file
        const workbook = XLSX.readFile("./data/product_data.xlsx");

        //Get product sheet
        const worksheet = workbook.Sheets["Products"];

        // Convert excel rows to javascript object
        const products = XLSX.utils.sheet_to_json(worksheet);

        console.log(`Found ${products.length} products`);

        // Convert excel string cells into js objects/array.
        const formattedProducts = products.map((product) => ({
            ...product,

            user: userID,
      
            sizes: JSON.parse(product.sizes),
            colors: JSON.parse(product.colors),
            images: JSON.parse(product.images),
          }));

        // Insert the products into the database
        await Product.insertMany(formattedProducts);

        console.log("Product data seeded successfully.")
        process.exit();
    } catch (error) {
        console.error("Error seeding the data: ", error);
        process.exit(1);
    }
}

seedData();