const mongoose = require("mongoose");

const demoRequestSchema = new mongoose.Schema({
  name: { type: String, required: true , trim: true },
  email: { type: String, required: true , trim: true },
  organization: { type: String, required: true , trim: true },
  mineRegion: { type: String},
  message: { type: String },
} , 
{ timestamps: true });

module.exports = mongoose.model("demoRequest", demoRequestSchema);
