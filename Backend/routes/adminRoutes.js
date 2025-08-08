import express from "express";
import userModel from "../model/User.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users (admin only)
// @access Private/Admin
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @route POST /api/admin/users
// @desc Create a new user (admin only)
// @access Private/Admin
router.post("/", requireAuth, requireAdmin, async (req, res) => {
    const { email, password, role, name, clerkUserId } = req.body;
    
    try {
        let user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new userModel({
            name,
            email,
            password,
            role: role || "customer",
            clerkUserId: clerkUserId || null,
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user});
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// @route PUT /api/admin/users/:id
// @desc Update info (admin only) - Name, email and role
// @access Private/Admin
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    
    const updateUser = await user.save();
    res.json({message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

// @route DELETE /api/admin/users/:id
// @desc Delete a user (admin only)
// @access Private/Admin
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;