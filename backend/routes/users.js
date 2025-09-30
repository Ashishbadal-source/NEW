// const express = require("express");
// const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

// // This users list is the same as auth.users in-memory; for simplicity replicate a local list
// let users = [
//   { id: uuidv4(), username: "admin", name: "Admin User", role: "admin" }
// ];

// router.get("/", (req, res) => res.json(users));

// router.post("/", (req, res) => {
//   const { username, name, role } = req.body;
//   const newUser = { id: uuidv4(), username, name, role: role || "user" };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const data = req.body;
//   const idx = users.findIndex(u => u.id === id);
//   if (idx === -1) return res.status(404).json({ message: "User not found" });
//   users[idx] = { ...users[idx], ...data };
//   res.json(users[idx]);
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   users = users.filter(u => u.id !== id);
//   res.json({ success: true });
// });

// module.exports = router;




// backend/routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

// // @desc    Get all users
// // @route   GET /api/users
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // @desc    Add new user
// // @route   POST /api/users
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, role, assignedMineId } = req.body;
//     const newUser = new User({ name, email, role, assignedMineId });
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid user data" });
//   }
// });

// // @desc    Update user
// // @route   PUT /api/users/:id
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, email, role, assignedMineId } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, role, assignedMineId },
//       { new: true }
//     );
//     if (!updatedUser) return res.status(404).json({ error: "User not found" });
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid update data" });
//   }
// });

// // @desc    Delete user
// // @route   DELETE /api/users/:id
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ error: "User not found" });
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;









// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// // ===================
// // Get all users
// // ===================
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ===================
// // Add new user (SIGNUP)
// // ===================
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password, role, assignedMineId } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       assignedMineId,
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid user data" });
//   }
// });

// // ===================
// // LOGIN
// // ===================
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     res.status(200).json({ message: "Login successful", user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ===================
// // Update user
// // ===================
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, email, role, assignedMineId } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, role, assignedMineId },
//       { new: true }
//     );
//     if (!updatedUser) return res.status(404).json({ error: "User not found" });
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid update data" });
//   }
// });

// // ===================
// // Delete user
// // ===================
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ error: "User not found" });
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;









// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// // SIGNUP
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password, role, assignedMineId } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       assignedMineId,
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// // SIGNUP
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password, role, assignedMineId } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "Name, email, and password required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       assignedMineId,
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     console.error(err); // <-- ye line add karo backend console me error dekhne ke liye
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("../models/User.js");

// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // 1️⃣ Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // 2️⃣ Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "User already exists" });

//     // 3️⃣ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 4️⃣ Create new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: "user",        // default role
//       assignedMineId: null // optional
//     });

//     // ✅ 5️⃣ Save user in DB & log
//     const savedUser = await newUser.save();
//     console.log("Saved user:", savedUser);  // <-- yaha add karo
//     res.status(201).json(savedUser);        // <-- yaha bhi

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

// ================================
// POST /api/users/signup
// ================================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",        // default role
      assignedMineId: null // optional
    });

    // 5️⃣ Save user in DB
    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser); // backend console log

    // 6️⃣ Respond to frontend
    res.status(201).json({ message: "User created successfully", user: savedUser });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
