// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db.js");
// const cors = require("cors"); // <-- add this

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());        // <-- add this
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
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// existing routes
const userRoutes = require("./routes/users.js");
app.use("/api/users", userRoutes);

// new demo routes
const demoRoutes = require("./routes/demoRoutes.js");
app.use("/api/demo", demoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
