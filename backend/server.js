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

<<<<<<< HEAD
// app.post('/api/auth/login', async (req, res) => {
//   const { name, email, password, role, secretCode } = req.body;

//   // Site: anyone allowed
//   if (role === 'site') {
//     // proceed normally
//   } else {
//     // Restricted roles
//     const validCodes = {
//       operator: "OP123",
//       inspector: "IN456",
//       admin: "AD789",
//     };

//     if (secretCode !== validCodes[role]) {
//       return res.status(403).json({ message: "Invalid code for role" });
//     }
//   }

//   // continue signup...
// });


// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body
console.log("✅ MongoDB Connected2");
// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://root:rootuser@cluster0.iue26ut.mongodb.net/rockfall", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected3"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
=======
console.log("COrs origing" , process.env.CORS_ORIGIN) ; 
>>>>>>> origin/Moksh

app.use(express.json());

// routes
const userRoutes = require("./routes/users.js");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
=======
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> origin/Moksh
