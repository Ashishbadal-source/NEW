const asynchandler = require("../utils/asyncHandler.js");
const User = require("../models/user.model.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const jwt = require("jsonwebtoken");

const signupUser = asynchandler(async (req, res) => {
  // signup ka logic here
  // get user details from frontend
  // validation - which are required ( like non empty , valid email , password length )
  // check if user already exists or not : name , email
  // create a new user  object
  // create entry in database
  // remove password and refreshToken from response
  // check for user creation
  const { name, email, password, role , secretCode} = req.body;

  if (role === "site") {
    // proceed normally
  } else {
    // Restricted roles
    const validCodes = {
      operator: "OP123",
      inspector: "IN456",
      admin: "AD789",
    };
    if (secretCode !== validCodes[role]) {
      return res.status(401).json({ error: "Invalid secret code" });
    }

  }

  if ([name, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please fill a valid email address" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  const existingUser = await User.findOne({ $or: [{ name }, { email }] });
  if (existingUser) {
    return res.status(409).json({ error: "User with this name or email already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(201).json(
    new ApiResponse({
      message: "User created successfully",
      data: createdUser,
    })
  )
});

const loginUser = asynchandler(async (req, res) => {
  // get user details from req.body
  // validation - non empty and others
  // check if user exists or not : name , email
  // check for password
  // generate access and refresh tokens
  // send cookie
  const {  email, password , role } = req.body;
  if (!email  || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ $or: [ { email }] }).select(
    "+password"
  );

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Invalid password" });
  }

  if( user.role !== role) {
    return res.status(400).json({ error: "You are not authorized to login as this role" });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json(
      new ApiResponse({
        statusCode: 200,
        message: "Login successful",
        data: {
          user,
          accessToken,
          refreshToken,
        },
      })
    );
});

const logoutUser = asynchandler(async (req, res) => {
  // get user id from req.user
  // find user by id
  // if user not found throw error
  // remove refresh token from db
  // clear cookies
  // send response

  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  res.clearCookie("refreshToken", options);
  res.clearCookie("accessToken", options);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Logout successful",
    })
  );
});

const refreshAccessToken = asynchandler(async (req, res) => {
  // get refresh token from cookie
  // if not present throw error
  // verify refresh token
  // if invalid throw error
  // find user by id from token
  // if user not found throw error
  // check if refresh token matches
  // if not match throw error
  // generate new access token
  // send response

  const IncomingrefreshToken =
    req.cookies.refreshToken || req.headers.authorization?.split(" ")[1]; // Bearer token
  if (!IncomingrefreshToken) {
    return res.status(401).json({ error: "Unauthorized : No token provided" });
  }

  try {
    let decoded = jwt.verify(
      IncomingrefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized : Invalid token" });
  }

  const user = await User.findById(decoded._id).select("+refreshToken");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.refreshToken !== IncomingrefreshToken) {
    return res.status(401).json({ error: "Unauthorized : Invalid token" });
  }

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();
  user.refreshToken = newRefreshToken;
  await user.save();

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json(
      new ApiResponse({
        statusCode: 200,
        message: "Access token refreshed successfully",
        data: {
          accessToken: newAccessToken,
        },
      })
    );
});

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
