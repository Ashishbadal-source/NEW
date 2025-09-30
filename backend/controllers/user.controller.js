const asynchandler  = require("../utils/asyncHandler.js");
const  ApiError  = require("../utils/ApiErrors.js");
const User = require("../models/user.model.js");
const {ApiResponse} = require("../utils/ApiResponse.js");
const jwt = require("jsonwebtoken")

const signupUser= asynchandler(async (req, res) => {
  // signup ka logic here
  // get user details from frontend
  // validation - which are required ( like non empty , valid email , password length )
  // check if user already exists or not : username , email
  // create a new user  object
  // create entry in database
  // remove password and refreshToken from response
  // check for user creation
  const { username, email, password  } = req.body;

  if (
    [username, email, password ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please fill a valid email address");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters long");
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "User with this username or email already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "User registered successfully",
      data: createdUser,
    })
  );
});

const loginUser = asynchandler(async (req, res) => {
  // get user details from req.body
  // validation - non empty and others
  // check if user exists or not : username , email
  // check for password
  // generate access and refresh tokens
  // send cookie
  const { username, email, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "email or username is required");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] }).select(
    "+password"
  );

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
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
    throw new ApiError(404, "User not found");
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
    throw new ApiError(401, "Unauthorized : No token provided");
  }

  try {
    let decoded = jwt.verify(
      IncomingrefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    throw new ApiError(401, "Unauthorized : Invalid token");
  }

  const user = await User.findById(decoded._id).select("+refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.refreshToken !== IncomingrefreshToken) {
    throw new ApiError(401, "Unauthorized : Invalid token");
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


module.exports =  {
  signupUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} ;

