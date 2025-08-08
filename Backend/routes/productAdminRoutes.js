import express from "express";
import Product from "../model/Product.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products (admin only)  
// @access Private/Admin
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;