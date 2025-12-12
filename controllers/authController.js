// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerSchema, loginSchema } from "../validators/authValidators.js";

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
};

export const registerUser = async (req, res) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: parse.error.errors.map(e => e.message).join(", ") });
  }
  const { fullName, username, email, password } = parse.data;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) return res.status(400).json({ message: "Email or username already in use" });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({ fullName, username, email, password: hashed });

  const token = signToken(user._id);

  res.status(201).json({
    message: "User registered",
    token,
    user: { id: user._id, fullName: user.fullName, username: user.username, email: user.email }
  });
};

export const loginUser = async (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: parse.error.errors.map(e => e.message).join(", ") });
  }
  const { usernameOrEmail, password } = parse.data;

  const user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user._id);
  res.json({
    message: "Login successful",
    token,
    user: { id: user._id, fullName: user.fullName, username: user.username, email: user.email }
  });
};
