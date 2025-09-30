const jwt = require("jsonwebtoken");
const asynchandler = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiErrors");


module.exports = asynchandler(async (req, res, next) => {   
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) {
        throw new ApiError(401, "Unauthorized: No token provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;  // decoded me user ka data hoga
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized: Invalid token");
    }
});
