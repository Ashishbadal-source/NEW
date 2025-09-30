const express = require("express");
const { urlencoded } = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.js");

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins for testing with Postman
    credentials: true,
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to the database:", err);
    process.exit(1);
  });

const userRouter = require("./routes/user.routes");
app.use("/api/users", userRouter);
