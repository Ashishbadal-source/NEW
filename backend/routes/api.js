import express from "express";
import User from "../models/user.js";

const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.json({ message: "API working!" });
});

// add user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
