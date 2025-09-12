import express from "express";
import userModel from "../model/User.js";

const router = express.Router();

// @route POST api/users/user-created
// @desc Register a new user
// @access public
router.post("/user-created", async (req, res) => {
  const { clerkUserId, email, name } = req.body;
  try {
    let user = await userModel.findOne({ clerkUserId });

    if (user)
      return res.json({
        user: {
          _id: user._id,
          clerkUserId: user.clerkUserId,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    user = new userModel({ clerkUserId, email, name });
    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        clerkUserId: user.clerkUserId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
