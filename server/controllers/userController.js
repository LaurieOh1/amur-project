import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createSendToken } from "../libs/jwt.js";


export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  createSendToken(res, 201, user);
});


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  
  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select("+password");

  
  const passwordOk = user ? await bcrypt.compare(password, user.password) : false;
  console.log("LOGIN DEBUG:", {
    email: normalizedEmail,
    userFound: !!user,
    hasBodyPassword: !!password,
    passwordOk,
  });

  if (!user || !passwordOk) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  
  createSendToken(res, 200, user);
});


export const logoutUser = asyncHandler((req, res) => {
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});


export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});


export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();
  res.status(200).json({ success: true, message: "Profile updated", user: updatedUser });
});


export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});


export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({ success: true, message: "User deleted" });
});
