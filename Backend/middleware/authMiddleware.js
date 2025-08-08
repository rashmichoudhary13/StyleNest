import User from "../model/User.js";

const requireAuth = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const user = await User.findOne({ clerkUserId: req.auth.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const user = await User.findOne({ clerkUserId });
    console.log("user:", user);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    req.user = user; // attach user if needed downstream
    next();
  } catch (err) {
    console.error("Admin check failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export { requireAuth, requireAdmin };
