const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors"); // <-- add this
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
dotenv.config();
connectDB();

const app = express();
app.use(cors());        // <-- add this
app.use(express.json());
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, role, secretCode } = req.body;

  // Site: anyone allowed
  if (role === 'site') {
    // proceed normally
  } else {
    // Restricted roles
    const validCodes = {
      operator: "OP123",
      inspector: "IN456",
      admin: "AD789",
    };

    if (secretCode !== validCodes[role]) {
      return res.status(403).json({ message: "Invalid code for role" });
    }

  }
  res.status(201).json({ message: "Signup successful", user: { name, email, role } });
});

// const User = require("./models/User"); // 👈 import model

// app.post('/api/auth/signup', async (req, res) => {
//   const { name, email, password, role, secretCode } = req.body;

//   try {
//     // Site: anyone allowed
//     if (role !== 'site') {
//       // Restricted roles
//       const validCodes = {
//         operator: "OP123",
//         inspector: "IN456",
//         admin: "AD789",
//       };

//       if (secretCode !== validCodes[role]) {
//         return res.status(403).json({ message: "Invalid code for role" });
//       }
//     }

//     // ✅ check if already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // ✅ save user in DB
//     const newUser = await User.create({
//       name,
//       email,
//       password,
//       role,
//     });

//     res.status(201).json({
//       message: "Signup successful",
//       user: { name: newUser.name, email: newUser.email, role: newUser.role },
//     });

//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// routes
const userRoutes = require("./routes/users.js");
app.use("/api/users", userRoutes);
// const User = require("./models/User"); // your Mongoose model

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     res.status(200).json({
//       message: "Login successful",
//       user: { name: user.name, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
//User = require("./models/User"); // your Mongoose model

app.post("/api/auth/login", async (req, res) => {
  const { email, password ,role} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});