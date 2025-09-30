const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors"); // <-- add this

dotenv.config();
connectDB();

const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

console.log("COrs origing" , process.env.CORS_ORIGIN) ; 

app.use(express.json());

// routes
const userRoutes = require("./routes/users.js");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
