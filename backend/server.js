// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json()); // to parse JSON body

// // Auth routes
// app.use("/api/auth", require("./routes/auth"));

// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });




// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose"); // ✅ for MongoDB
// console.log("✅ MongoDB Connected1")
// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json()); // parse JSON body
// console.log("✅ MongoDB Connected2");
// // ✅ MongoDB connection
// mongoose
//   .connect("mongodb+srv://root:rootuser@cluster0.iue26ut.mongodb.net/rockfall", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected3"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Routes
// app.use("/api/auth", require("./routes/auth"));       // Auth routes
// app.use("/api/incidents", require("./routes/Incident")); // Incident routes

// // Start server
// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import apiRoutes from "./routes/api.js";

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database
// connectDB();

// // Routes
// app.use("/api", apiRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// // Routes
// const userRoutes = require("./routes/users");
// app.use("/api/users", userRoutes);

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js"; // <-- yaha import

// dotenv.config(); // env load kar lo

// connectDB(); // <-- yaha call karo, server start hone se pehle

// const app = express();

// app.use(express.json());

// // example route
// app.get("/", (req, res) => {
//   res.send("Server running");
// });

// // your user routes
// import userRoutes from "./routes/users.js";
// app.use("/api/users", userRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db.js");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// // routes
// const userRoutes = require("./routes/users.js");
// app.use("/api/users", userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors"); // <-- add this

dotenv.config();
connectDB();

const app = express();
app.use(cors());        // <-- add this
app.use(express.json());

// routes
const userRoutes = require("./routes/users.js");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
