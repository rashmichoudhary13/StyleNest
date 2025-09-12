import express from "express";
import Order from "../model/Order.js";
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access private
router.get("/my-orders", requireAuth, async (req, res) => {
    console.log("outside of try")
    try {
        // Find orders for the authenticated user
        console.log("2")
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }); // sort by most recent orders
         console.log("3")
        if (!orders || orders.length === 0) {
            return res.json({ message: "No orders found" });
        }
         console.log("4")
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route GET /api/orders/:id
// @desc Get order details by ID
// @access private
router.get("/:id", requireAuth, async(req, res) => {
    try {
        const order = await Order.findById(req.params.id) //.populate("user", "name email");

        if(!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;