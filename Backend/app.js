import express from "express";
import path from 'path';
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import subscribeRoutes from "./routes/subscribeRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import productAdminRoutes from "./routes/productAdminRoutes.js"
import adminOrderRoutes from "./routes/adminOrderRoutes.js"
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(ClerkExpressWithAuth());

const PORT = process.env.PORT || 3000;

//connect to Mongodb
connectDB();

app.get("/", (req,res) => {
  res.send("Welcome to rabbit api!");
});

// API Routes
app.use("/api/users",userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

// Admin Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
