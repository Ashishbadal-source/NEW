const jwt = require("jsonwebtoken");
const asynchandler = require("../utils/asyncHandler");


module.exports = asynchandler(async (req, res, next) => {   
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;  // decoded me user ka data hoga
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
});
