// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("User", userSchema);


// backend/models/User.js
const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     role: {
//       type: String,
//       enum: ["main_admin", "sub_admin", "operator"],
//       default: "operator",
//     },
//     assignedMineId: { type: String },
//   },
//   { timestamps: true }
// );

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "manager", "supervisor"], // <-- allowed values
    default: "user"
  },
  assignedMineId: { type: String, default: null }
});

module.exports = mongoose.model("User", userSchema);
