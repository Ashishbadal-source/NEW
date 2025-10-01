const express = require("express");
const DemoRequest = require("../models/DemoRequest.js");

const router = express.Router();

// POST - save demo request
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, organization, mineRegion, message } = req.body;

//     if (!name || !email || !organization) {
//       return res.status(400).json({ error: "Name, Email & Organization are required" });
//     }

//     const newRequest = new DemoRequest({ name, email, organization, mineRegion, message });
//     await newRequest.save();

//     res.status(201).json({ message: "Demo request submitted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });
router.post("/", async (req, res) => {
  console.log("Demo request body received:", req.body); // ✅ CMD log

  try {
    const demoRequest = new DemoRequest(req.body);
    await demoRequest.save();
    console.log("Saved to DB:", demoRequest);
    res.status(201).json({ message: "Demo request saved", data: demoRequest });
  } catch (error) {
    console.error("Error saving demo request:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// GET - fetch all demo requests
router.get("/", async (req, res) => {
  try {
    const requests = await DemoRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
